export interface InputParams {
    broadcastPath: string;
    rpcUrl?: string;
    etherscanUrl?: string;
    etherscanApiKey?: string;
    help?: boolean;
}

export interface BroadcastReportTx {
    hash: string;
    transactionType: string;
    contractName: string;
    contractAddress: string;
    arguments: string[];
    rpc: string;
}

export interface BroadcastReceipt {
    transactionHash: string;
    from: string;
    to: string | null;
    cumulativeGasUsed: string;
    gasUsed: string;
    contractAddress: string;
}

export interface BroadcastReport {
    transactions: BroadcastReportTx[];
    receipts: BroadcastReceipt;
    libraries: string[];
    path: string;
    timestamp: number;
    chain: number;
    multi: boolean;
    commit: string;
}

export interface EtherscanVerification {
    apikey: String;
    module: String;
    action: String;
    sourceCode: String;
    contractaddress: String;
    codeformat: String;
    contractname: String;
    compilerversion: String;
    optimizationused: Number;
    runs?: Number;
    constructorArguements?: String;
    evmversion?: String;
    licenseType?: Number;
    libraryname?: String;
    libraryaddress?: String;
}

export enum Networks {
    matic = 137,
    main = 1,
    arbitrum = 42161,
    avalanche = 43114,
    optimism = 10,
    goerli = 5,
    sepolia = 11155111,
    bsc_testnet = 97,
    base = 8453,
}
