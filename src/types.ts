export interface InputParams {
  broadcastPath: string;
  rpcUrl?: string;
  explorerUrl?: string;
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
  chainid: string;
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
