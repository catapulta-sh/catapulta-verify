export const isBytecodeInBuildInfo = (
	bytecode: string,
	buildInfo: any,
): boolean => {
	const contractRefs = Object.keys(buildInfo.output.contracts);
	for (let i = 0; i < contractRefs.length; i++) {
		const contractNames = Object.keys(
			buildInfo.output.contracts[contractRefs[i]],
		);
		for (let j = 0; j < contractNames.length; j++) {
			const contractName = contractNames[j];
			const contractInfo =
				buildInfo.output.contracts[contractRefs[i]][contractName];
			if (
				contractInfo.evm.bytecode.object
					.toLowerCase()
					.startsWith(bytecode.substring(2).toLowerCase())
			) {
				return true;
			}
		}
	}
	return false;
};

export const isBytecodeInArtifact = (
	bytecodeAndParams: string,
	artifact: any,
): boolean => {
	return !!bytecodeAndParams
		.toLowerCase()
		.startsWith(artifact.bytecode.object.toLowerCase());
};

export const getContractDataByArtifactAndBuildInfo = (
	artifact: any,
	buildInfo: any,
): {
	contractName: string;
	contractInfo: {};
	contractPath: string;
} => {
	const metadata: any = { sources: [], settings: {}, language: "" };
	metadata.settings = Object.assign({}, buildInfo.input.settings);
	metadata.language = buildInfo.input.language;
	metadata.sources = Object.fromEntries(
		Object.keys(artifact.metadata.sources).map((key) => {
			let buildInfoSource = buildInfo.input.sources[key];
			// if contract is duplicated is possible is in another similar path in other library
			if (!buildInfoSource) {
				const possibleKey = Object.keys(buildInfo.input.sources).find((x) =>
					x.endsWith(key),
				);
				if (possibleKey) {
					buildInfoSource = buildInfo.input.sources[possibleKey];
				} else {
					console.log("Missing smart contract path at build-info file", key);
				}
			}
			const newValue = {
				content: buildInfoSource.content,
			};
			return [key, newValue];
		}),
	);

	return {
		contractName: `${
			Object.keys(artifact.metadata.settings.compilationTarget)[0]
		}:${Object.values(artifact.metadata.settings.compilationTarget)[0]}`,
		contractInfo: metadata,
		contractPath: Object.keys(artifact.metadata.settings.compilationTarget)[0],
	};
};
