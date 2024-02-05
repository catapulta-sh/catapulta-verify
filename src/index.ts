#!/usr/bin/env node

import { existsSync } from "fs";
import chalk from "chalk";
import "dotenv/config";
import { exit } from "process";
import { getChainId } from "viem/actions";
import { args } from "./cli-args";
import { VERIFY_VERSION, getClient } from "./config";
import { callTraceVerifier } from "./utils/calltrace-verifier";
import { loadArtifacts, loadBuildInfo } from "./utils/foundry-ffi";
import { loadJson } from "./utils/json";
import { getTxInternalCalls } from "./utils/rpc";

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

    const client = getClient({ chainId: parsedRun.chain, rpcUrl: args.rpcUrl, apiUrl: args.etherscanUrl });
    const chainId = await getChainId(client);

    try {
        console.log("Chain Id:", chainId);
        console.log();
    } catch (err) {
        console.log("Could not connect to RPC endpoint", client.transport.url);
        process.exit(2);
    }

    const buildInfos = await loadBuildInfo(parsedRun);
    const artifacts = await loadArtifacts();

    console.log("\nAnalyzing deployment transactions...\n");
    for (const tx of parsedRun.transactions) {
        const trace = await getTxInternalCalls(tx.hash, client.transport.url as string);

        try {
            await callTraceVerifier(trace.result, chainId, artifacts, buildInfos, client, args.etherscanApiKey);
        } catch (error) {
            console.error("[Verification Error]", error);
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
