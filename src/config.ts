import { Networks } from "./types";

const packageJson = require("../package.json");
export const VERIFY_VERSION = packageJson.version;

export const ETHERSCAN_API_KEYS: {
    [key: number]: string;
} = {
    [Networks.polygon]: process.env.ETHERSCAN_API_KEY_MATIC || "",
    [Networks.main]: process.env.ETHERSCAN_API_KEY_MAINNET || "",
    [Networks.arbitrum]: process.env.ETHERSCAN_API_KEY_ARBITRUM || "",
    [Networks.optimism]: process.env.ETHERSCAN_API_KEY_OPTIMISM || "",
    [Networks.goerli]: process.env.ETHERSCAN_API_KEY_GOERLI || "",
    [Networks.sepolia]: process.env.ETHERSCAN_API_KEY_SEPOLIA || "",
    [Networks.avalanche]: process.env.ETHERSCAN_API_KEY_AVALANCHE || "",
    [Networks.avalancheFuji]: process.env.ETHERSCAN_API_KEY_AVALANCHE_FUJI || "",
    [Networks.bsc]: process.env.ETHERSCAN_API_KEY_BSC || "",
    [Networks.bscTestnet]: process.env.ETHERSCAN_API_KEY_BSC_TESTNET || "",
    [Networks.base]: process.env.ETHERSCAN_API_KEY_BASE || "",
};

export const ETHERSCAN_API_URL: {
    [key: string]: string;
} = {
    [Networks.polygon]: "https://api.polygonscan.com/api",
    [Networks.main]: "https://api.etherscan.io/api",
    [Networks.arbitrum]: "https://api.arbiscan.io/api",
    [Networks.avalanche]: "https://api.routescan.io/v2/network/mainnet/evm/43114/etherscan",
    [Networks.avalancheFuji]: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
    [Networks.optimism]: "https://api-optimistic.etherscan.io/api",
    [Networks.goerli]: "https://api-goerli.etherscan.io/api",
    [Networks.sepolia]: "https://api-sepolia.etherscan.io/api",
    [Networks.bsc]: "https://api.bscscan.com/api",
    [Networks.bscTestnet]: "https://api-testnet.bscscan.com/api",
    [Networks.base]: "https://api.basescan.org/api",
};

export const DEFAULT_RPC_URLS: {
    [key: string]: string;
} = {
    [Networks.polygon]: process.env.RPC_POLYGON || "",
    [Networks.main]: process.env.RPC_MAINNET || "",
    [Networks.arbitrum]: process.env.RPC_ARBITRUM || "",
    [Networks.avalanche]: process.env.RPC_AVALANCHE || "",
    [Networks.optimism]: process.env.RPC_OPTIMISM || "",
    [Networks.goerli]: process.env.RPC_GOERLI || "",
    [Networks.sepolia]: process.env.RPC_SEPOLIA || "",
    [Networks.bsc]: process.env.RPC_BSC || "",
    [Networks.bscTestnet]: process.env.RPC_BSC_TESTNET || "",
    [Networks.base]: process.env.RPC_BASE || "",
};
