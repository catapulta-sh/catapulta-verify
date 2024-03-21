#!/usr/bin/env node

import { existsSync } from "node:fs";
import { exit } from "node:process";
import chalk from "chalk";
import "dotenv/config";
import { args } from "./cli-args";
import { NETWORK_CONFIGS, VERIFY_VERSION } from "./config";
import { callTraceVerifier } from "./utils/calltrace-verifier";
import { loadArtifacts, loadBuildInfo } from "./utils/foundry-ffi";
import { loadJson } from "./utils/json";
import { getChainId, getTxInternalCalls } from "./utils/rpc";

// prevent dotenv env to affect child_process.execSync environment
delete process.env.FOUNDRY_LIBRARIES;
delete process.env.DAPP_LIBRARIES;

const main = async () => {
    const broadcastPath = args.broadcastPath;
    if (!broadcastPath) {
    }
    if (!existsSync(broadcastPath)) {
        console.log(`Broadcast report not found at path ${broadcastPath}. Exiting.`);
        process.exit(404);
    }
    const parsedRun = await loadJson(broadcastPath);

    if (parsedRun.transactions.length === 0) {
        console.log(`No transactions found in the broadcast path provided: ${broadcastPath}`);
        process.exit(1);
    }

    greets();

    const networkConfig = NETWORK_CONFIGS[parsedRun.chain];
    if (args.rpcUrl) networkConfig.RPC = args.rpcUrl;
    if (args.explorerUrl) networkConfig.explorers = [{ API_URL: args.explorerUrl, API_KEY: args.etherscanApiKey }];

    const chainId = await getChainId(networkConfig.RPC);

    try {
        console.log("Chain Id:", chainId);
        console.log();
    } catch (err) {
        console.log("Could not connect to RPC endpoint", networkConfig.RPC);
        process.exit(2);
    }

    const buildInfos = await loadBuildInfo(parsedRun);
    const artifacts = await loadArtifacts();

    console.log("\nAnalyzing deployment transactions...\n");
    for (const tx of parsedRun.transactions) {
        const trace = await getTxInternalCalls(tx.hash, networkConfig.RPC);
        for (const explorer of networkConfig.explorers) {
            try {
                await callTraceVerifier(trace.result, artifacts, buildInfos, explorer);
            } catch (error) {
                console.error("[Verification Error]", error);
            }
        }
    }
    console.log("\n[catapulta-verify] Verification finished.");
    console.log(
        "\n[catapulta-verify] Check out",
        chalk.green("catapulta.sh"),
        "for zero config deployments, automated verifications and deployment reports for Foundry projects. ",
    );
};

const greets = () => {
    const greetings = ["Catapulta.sh", "Verify Lite", VERIFY_VERSION];
    const [intro, ...restMsg] = greetings;
    console.log("");
    console.log(chalk.green(intro), ...restMsg);
    console.log("=".repeat(greetings.join(" ").length));
};

main().catch((error) => {
    console.error("[catapulta-verify] Exiting main handler, error:");
    console.error(error);
    exit(2);
});
