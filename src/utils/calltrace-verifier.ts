import { ExplorerConfig } from "../config";
import { checkIfVerified, checkVerificationStatus, submitVerification, waitTillVisible } from "./explorer-api";
import { getSettingsByArtifact } from "./foundry-ffi";
import { delay, renderExplorerUrl } from "./misc";

export const callTraceVerifier = async (call: any, artifacts: any[], buildInfos: any[], explorer: ExplorerConfig) => {
    const deployOpcodes = ["CREATE", "CREATE2"];

    // Perform nested call tracing verification in each internal call
    if (call.calls) {
        for (const c of call.calls) {
            await callTraceVerifier(c, artifacts, buildInfos, explorer);
        }
    }

    if (!deployOpcodes.includes(call.type)) return;

    await waitTillVisible(call.to, explorer);

    const verified = await checkIfVerified(call.to, explorer);

    if (verified) {
        console.log(`(${renderExplorerUrl(call.to, explorer)}) is already verified, skipping.`);
        return;
    }

    // if the tx has subdeployments get the deployed bytecode from the last deployment in order to
    // compare the bytecode and deployed bytecode strings, resulting in the constructor params

    const verificationReq = await getSettingsByArtifact(artifacts, buildInfos, call.input, call.to, explorer.API_KEY);
    if (!verificationReq) {
        console.log("Couldn't get the params for the verification request");
        return;
    }

    const { result: guid, message, status }: any = await submitVerification(verificationReq, explorer.API_URL);

    if (!status || guid.includes("Max rate limit reached")) {
        console.log(`Couldn't verify ${renderExplorerUrl(call.to, explorer)} `, guid);
        return;
    }

    console.log(`Verifying contract ${renderExplorerUrl(call.to, explorer)}, with guid: ${guid}`);

    for (let i = 0; i < 30; i++) {
        await delay(1000);
        const { status, message } = await checkVerificationStatus(guid, explorer);

        if (status !== 2) {
            console.log(message);
            break;
        }
        process.stdout.write(".");
    }
};
