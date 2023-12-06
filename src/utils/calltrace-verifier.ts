import {
	checkIfVerified,
	checkVerificationStatus,
	submitVerification,
	waitTillVisible,
} from "./explorer-api";
import { getSettingsByArtifact } from "./foundry-ffi";
import { delay } from "./misc";

export const callTraceVerifier = async (
	call: any,
	chainId: number,
	artifacts: any[],
	buildInfos: any[],
	etherscanUrl?: string,
	etherscanApiKey?: string,
) => {
	const deployOpcodes = ["CREATE", "CREATE2"];

	// Perform nested call tracing verification in each internal call
	if (call.calls) {
		for (const c of call.calls) {
			await callTraceVerifier(
				c,
				chainId,
				artifacts,
				buildInfos,
				etherscanUrl,
				etherscanApiKey,
			);
		}
	}

	if (!deployOpcodes.includes(call.type)) return;

	await waitTillVisible(
		call.to,
		Number(chainId),
		etherscanUrl,
		etherscanApiKey,
	);

	const verified = await checkIfVerified(
		call.to,
		Number(chainId),
		etherscanUrl,
		etherscanApiKey,
	);

	if (verified) {
		console.log(`(${call.to}) is already verified, skipping.`);
		return;
	}

	// if the tx has subdeployments get the deployed bytecode from the last deployment in order to
	// compare the bytecode and deployed bytecode strings, resulting in the constructor params

	const verificationReq = await getSettingsByArtifact(
		Number(chainId),
		artifacts,
		buildInfos,
		call.input,
		call.to,
		etherscanApiKey,
	);
	if (!verificationReq) {
		console.log("Couldn't get the params for the verification request");
		return;
	}

	const {
		result: guid,
		message,
		status,
	}: any = await submitVerification(
		verificationReq,
		Number(chainId),
		etherscanUrl,
	);

	if (!status || guid.includes("Max rate limit reached")) {
		console.log(`Couldn't verify ${call.to} `, guid);
		return;
	}

	console.log(`Verifying contract ${call.to}, with guid: ${guid}`);

	for (var i = 0; i < 30; i++) {
		await delay(350);
		const { status, message } = await checkVerificationStatus(
			guid,
			chainId,
			etherscanUrl,
			etherscanApiKey,
		);

		if (status != 2) {
			console.log(message);
			break;
		}
		process.stdout.write(".");
	}
};
