import { Networks } from "./types";

export const ETHERSCAN_API_KEYS: {
    [key: number]: string;
} = {
    [Networks.matic]: process.env.ETHERSCAN_API_KEY_MATIC || '',
    [Networks.main]: process.env.ETHERSCAN_API_KEY_MAINNET || '',
    [Networks.arbitrum]: process.env.ETHERSCAN_API_KEY_ARBITRUM || '',
    [Networks.optimism]: process.env.ETHERSCAN_API_KEY_OPTIMISM || '',
    [Networks.goerli]: process.env.ETHERSCAN_API_KEY_GOERLI || '',
    [Networks.sepolia]: process.env.ETHERSCAN_API_KEY_SEPOLIA || '',
    [Networks.avalanche]: process.env.ETHERSCAN_API_KEY_AVALANCHE || '',
    [Networks.bsc_testnet]: process.env.ETHERSCAN_API_KEY_BSC || '',
    [Networks.base]: process.env.ETHERSCAN_API_KEY_BASE || '',
};

export const ETHERSCAN_API_URL: {
    [key: string]: string;
} = {
    [Networks.matic]: 'https://api.polygonscan.com/api',
    [Networks.main]: 'https://api.etherscan.io/api',
    [Networks.arbitrum]: 'https://api.arbiscan.io/api',
    [Networks.avalanche]: 'https://api.snowtrace.io/api',
    [Networks.optimism]: 'https://api-optimistic.etherscan.io/api',
    [Networks.goerli]: 'https://api-goerli.etherscan.io/api',
    [Networks.sepolia]: 'https://api-sepolia.etherscan.io/api',
    [Networks.bsc_testnet]: 'https://api-testnet.bscscan.com/api',
    [Networks.base]: 'https://api.basescan.org/api',
};

export const DEFAULT_RPC_URLS: {
    [key: string]: string;
} = {
    [Networks.matic]: process.env.RPC_POLYGON || '',
    [Networks.main]: process.env.RPC_MAINNET || '',
    [Networks.arbitrum]: process.env.RPC_ARBITRUM || '',
    [Networks.avalanche]: process.env.RPC_AVALANCHE || '',
    [Networks.optimism]: process.env.RPC_OPTIMISM || '',
    [Networks.goerli]: process.env.RPC_GOERLI || '',
    [Networks.sepolia]: process.env.RPC_SEPOLIA || '',
    [Networks.bsc_testnet]: process.env.RPC_BSC_TESTNET || '',
    [Networks.base]: process.env.RPC_BASE || '',
};

