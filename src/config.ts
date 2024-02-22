import { Networks } from "./types";

const packageJson = require("../package.json");
export const VERIFY_VERSION = packageJson.version;

export const VERBOSE = !!process.env.VERBOSE;

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
    [Networks.bnb]: process.env.ETHERSCAN_API_KEY_BNB || "",
    [Networks.bnbTestnet]: process.env.ETHERSCAN_API_KEY_BNB_TESTNET || "",
    [Networks.base]: process.env.ETHERSCAN_API_KEY_BASE || "",
    [Networks.metis]: process.env.ETHERSCAN_API_KEY_METIS || "",
    [Networks.gnosis]: process.env.ETHERSCAN_API_KEY_GNOSIS || "",
    [Networks.scroll]: process.env.ETHERSCAN_API_KEY_SCROLL || "",
    [Networks.zkevm]: process.env.ETHERSCAN_API_KEY_ZKEVM || "",
    [Networks.celo]: process.env.ETHERSCAN_API_KEY_CELO || "",
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
    [Networks.bnb]: "https://api.bscscan.com/api",
    [Networks.bnbTestnet]: "https://api-testnet.bscscan.com/api",
    [Networks.base]: "https://api.basescan.org/api",
    [Networks.metis]: "https://api.routescan.io/v2/network/mainnet/evm/1088/etherscan",
    [Networks.gnosis]: "https://api.gnosisscan.io/api",
    [Networks.scroll]: "https://api.scrollscan.com/api",
    [Networks.zkevm]: "https://api-zkevm.polygonscan.com/api",
    [Networks.celo]: "https://api.celoscan.io/api",
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
    [Networks.bnb]: process.env.RPC_BNB || "",
    [Networks.bnbTestnet]: process.env.RPC_BNB_TESTNET || "",
    [Networks.base]: process.env.RPC_BASE || "",
    [Networks.gnosis]: process.env.RPC_GNOSIS || "",
    [Networks.scroll]: process.env.RPC_SCROLL || "",
    [Networks.zkevm]: process.env.RPC_ZKEVM || "",
    [Networks.celo]: process.env.RPC_CELO || "",
};
