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
    apikey: string;
    module: string;
    action: string;
    sourceCode: string;
    contractaddress: string;
    codeformat: string;
    contractname: string;
    compilerversion: string;
    optimizationused: number;
    runs?: number;
    constructorArguements?: string;
    evmversion?: string;
    licenseType?: number;
    libraryname?: string;
    libraryaddress?: string;
}

export enum Networks {
    polygon = 137,
    main = 1,
    arbitrum = 42161,
    avalanche = 43114,
    avalancheFuji = 43113,
    optimism = 10,
    goerli = 5,
    sepolia = 11155111,
    bsc = 56,
    bscTestnet = 97,
    base = 8453,
    metis = 1088,
}
