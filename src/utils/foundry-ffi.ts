import { execSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import type { BroadcastReport, EtherscanVerification } from "../types.ts";
import { getContractDataByArtifactAndBuildInfo, isBytecodeInArtifact, isBytecodeInBuildInfo } from "./bytecode.ts";
import { loadJson } from "./json.ts";
import { extractOneLicenseFromSourceFile } from "./license.ts";

function recFindByExt(base: string, ext: string, prevFiles?: string[], prevResult?: any): string[] {
    const files = prevFiles || readdirSync(base);
    let result = prevResult || [];

    for (const file of files) {
        const newbase = path.join(base, file);
        if (statSync(newbase).isDirectory()) {
            result = recFindByExt(newbase, ext, readdirSync(newbase), result);
        } else {
            if (file.substr(-1 * (ext.length + 1)) === "." + ext) {
                result.push(newbase);
            }
        }
    }
    return result;
}

export const loadArtifacts = async (): Promise<any[]> => {
    const artifactsFiles: string[] = recFindByExt(path.normalize("out"), "json");

    const importedArtifacts = await Promise.all(
        artifactsFiles.map(async (artifactFilePath) => {
            const parsedJson = await loadJson(artifactFilePath);
            return parsedJson;
        }),
    );
    const filteredArtifactsFiles = importedArtifacts.filter((y) => !!y?.bytecode && !(y?.bytecode?.object === "0x"));

    return filteredArtifactsFiles;
};

export const loadBuildInfo = async (parsedRun: BroadcastReport): Promise<any[]> => {
    console.log("Compiling contracts with build info...");

    // Remove FOUNDRY_LIBRARIES from .env, due it could mutate bytecode of deployments with different compilation contexts, .env will be restored back at exit
    const dotEnvExists = existsSync(".env");
    if (dotEnvExists) {
        execSync("cp .env .env.bk && sed -i.sedbak -r '/FOUNDRY_LIBRARIES/d' .env && rm .env.sedbak && sleep 1");
    }

    let forgeBuildCmd = "forge build --skip test script --build-info";

    if (parsedRun?.libraries?.length) {
        forgeBuildCmd = `FOUNDRY_LIBRARIES="${parsedRun.libraries.join(",")}" ${forgeBuildCmd}`;
    }

    try {
        execSync(forgeBuildCmd, { stdio: "inherit" });
    } finally {
        if (dotEnvExists) {
            execSync("cp .env.bk .env && rm .env.bk", { stdio: "inherit" });
        }
    }

    console.log("Compilation successful");

    const buildInfos: any[] = [];

    const buildInfosInDir = readdirSync(path.join("out", "build-info")).filter(
        (file) => path.extname(file) === ".json",
    );

    for (const file of buildInfosInDir) {
        buildInfos.push(await loadJson(path.join("out", "build-info", file)));
    }

    return buildInfos;
};

export const getSettingsByArtifact = async (
    artifacts: any[],
    buildInfos: any[],
    bytecodeAndParams: string,
    deploymentAddress: string,
    chainId: string,
    etherscanApiKey?: string,
): Promise<EtherscanVerification | undefined> => {
    const settings: EtherscanVerification = {} as EtherscanVerification;

    const foundArtifact = artifacts.find((artifact) => isBytecodeInArtifact(bytecodeAndParams, artifact));

    if (!foundArtifact) {
        console.log(`Couldn't find artifact via bytecode for ${deploymentAddress}`);
        return;
    }

    const foundBuildInfo = buildInfos.find((buildInfo) =>
        isBytecodeInBuildInfo(foundArtifact.bytecode.object, buildInfo),
    );

    if (!foundBuildInfo) {
        console.log(`Couldn't find build-info via bytecode for ${deploymentAddress}`);
        console.log(bytecodeAndParams);
        return;
    }

    const contractData = getContractDataByArtifactAndBuildInfo(foundArtifact, foundBuildInfo);

    const { contractName, contractInfo, contractPath } = <
        { contractName: string; contractInfo: any; contractPath: string }
    >contractData;
    const licenseType = extractOneLicenseFromSourceFile(contractInfo.sources[contractPath].content);

    if (!licenseType) return;

    const rawParams = bytecodeAndParams.split(foundArtifact.bytecode.object)[1] || "";

    const metadata = foundArtifact.metadata;
    settings.apikey = etherscanApiKey || "";
    settings.chainId = chainId;
    settings.module = "contract";
    settings.action = "verifysourcecode";
    settings.sourceCode = JSON.stringify(contractData.contractInfo);
    settings.contractaddress = deploymentAddress;
    settings.codeformat = "solidity-standard-json-input";
    settings.contractname = contractName;
    settings.compilerversion = "v" + metadata.compiler.version;
    settings.optimizationused = Number(metadata.settings.optimizer.enabled);
    settings.runs = metadata.settings.optimizer.runs;
    settings.constructorArguements = rawParams;
    settings.evmversion = metadata.settings.evmVersion || "None";
    settings.licenseType = licenseType || 1;

    return settings;
};
