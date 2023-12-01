import { loadJson } from './utils/json';
import { exit } from "process";
import { existsSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Bluebird from "bluebird";
import { JsonRpcProvider } from "ethers/providers";
import { callTraceVerifier } from "./utils/calltrace-verifier";
import { DEFAULT_RPC_URLS } from "./config";
import { loadBuildInfo, loadArtifacts } from "./utils/foundry-ffi";
import { args } from './cli-args';
import chalk from 'chalk';

dotenv.config();

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
    const rpc = args.rpcUrl || DEFAULT_RPC_URLS[parsedRun.chain];
    const provider = new JsonRpcProvider(rpc);
    const chainId = parsedRun.chain;
    console.log('');
    console.log(chalk.green('Catapulta.sh'), 'Verify Lite 0.1.0');
    console.log('==============================');
    try {
        const network = await provider._detectNetwork();
        console.log('Network:', network.name);
        console.log('Chain Id:', chainId);
        console.log();
    } catch (err) {
        console.log('Could not connect to RPC endpoint', rpc);
        process.exit(2);
    }

    const buildInfos = await loadBuildInfo(parsedRun);
    const artifacts = await loadArtifacts();

    await Bluebird.each(parsedRun.transactions, async (tx: any, index) => {
        const [trace]: any = await provider._send({
            jsonrpc: '2.0',
            id: 1,
            method: 'debug_traceTransaction',
            params: [
                tx.hash,
                {
                    tracer: 'callTracer',
                },
            ],
        });

        await callTraceVerifier(
            trace.result,
            chainId,
            artifacts,
            buildInfos,
            args.etherscanUrl,
            args.etherscanApiKey
        );
    });
    console.log();
    console.log('[catapulta-verify] Verification finished.')
    console.log('[catapulta-verify] Check out', chalk.green('catapulta.sh'), 'for zero config deployments, automated verifications and deployment reports for Foundry projects. ')
};

main().catch((error) => {
    console.error('[catapulta-verify] Exiting main handler, error:');
    console.error(error);
    exit(2);
});