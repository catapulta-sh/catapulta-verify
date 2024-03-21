import { Networks } from "./types";

const packageJson = require("../package.json");
export const VERIFY_VERSION = packageJson.version;

export const VERBOSE = !!process.env.VERBOSE;

export type ExplorerConfig = {
    API_URL: string;
    SITE_URL?: string;
    API_KEY?: string;
};

export type NetworkConfig = {
    RPC: string;
    explorers: ExplorerConfig[];
};

export const NETWORK_CONFIGS: Record<string, NetworkConfig> = {
    [Networks.polygon]: {
        RPC: process.env.RPC_POLYGON || "",
        explorers: [
            {
                API_URL: "https://api.polygonscan.com/api",
                API_KEY: process.env.ETHERSCAN_API_KEY_POLYGON || "",
                SITE_URL: "https://polygonscan.com",
            },
        ],
    },
    [Networks.main]: {
        RPC: process.env.RPC_MAINNET || "",
        explorers: [
            {
                API_URL: "https://api.etherscan.io/api",
                API_KEY: process.env.ETHERSCAN_API_KEY_MAINNET || "",
                SITE_URL: "https://etherscan.io",
            },
        ],
    },
    [Networks.arbitrum]: {
        RPC: process.env.RPC_ARBITRUM || "",
        explorers: [
            {
                API_URL: "https://api.arbiscan.io/api",
                API_KEY: process.env.ETHERSCAN_API_KEY_ARBITRUM || "",
                SITE_URL: "https://arbiscan.io",
            },
        ],
    },
    [Networks.avalanche]: {
        RPC: process.env.RPC_AVALANCHE || "",
        explorers: [
            {
                API_URL: "https://api.snowscan.xyz/api",
                API_KEY: process.env.ETHERSCAN_API_KEY_AVALANCHE || "",
                SITE_URL: "https://snowscan.xyz",
            },
            {
                API_URL: "https://api.routescan.io/v2/network/mainnet/evm/43114/etherscan",
                SITE_URL: "https://snowtrace.io",
            },
        ],
    },
    [Networks.optimism]: {
        RPC: process.env.RPC_OPTIMISM || "",
        explorers: [
            {
                API_URL: "https://api-optimistic.etherscan.io/api",
                API_KEY: process.env.ETHERSCAN_API_KEY_OPTIMISM || "",
                SITE_URL: "https://optimistic.etherscan.io",
            },
        ],
    },
    [Networks.sepolia]: {
        RPC: process.env.RPC_SEPOLIA || "",
        explorers: [
            {
                API_URL: "https://api-sepolia.etherscan.io/api",
                API_KEY: process.env.ETHERSCAN_API_KEY_SEPOLIA || "",
                SITE_URL: "https://sepolia.etherscan.io",
            },
        ],
    },
    [Networks.bnb]: {
        RPC: process.env.RPC_BNB || "",
        explorers: [
            {
                API_URL: "https://api.bscscan.com/api",
                API_KEY: process.env.ETHERSCAN_API_KEY_BNB || "",
                SITE_URL: "https://bscscan.com",
            },
        ],
    },
    [Networks.bnbTestnet]: {
        RPC: process.env.RPC_BNB_TESTNET || "",
        explorers: [
            {
                API_URL: "https://api-testnet.bscscan.com/api",
                API_KEY: process.env.ETHERSCAN_API_KEY_BNB_TESTNET || "",
                SITE_URL: "https://testnet.bscscan.com",
            },
        ],
    },
    [Networks.base]: {
        RPC: process.env.RPC_BASE || "",
        explorers: [
            {
                API_URL: "https://api.basescan.org/api",
                API_KEY: process.env.ETHERSCAN_API_KEY_BASE || "",
                SITE_URL: "https://testnet.bscscan.com",
            },
        ],
    },
    [Networks.gnosis]: {
        RPC: process.env.RPC_GNOSIS || "",
        explorers: [
            {
                API_URL: "https://api.gnosisscan.io/api",
                API_KEY: process.env.ETHERSCAN_API_KEY_GNOSIS || "",
                SITE_URL: "https://gnosisscan.io",
            },
        ],
    },
    [Networks.scroll]: {
        RPC: process.env.RPC_SCROLL || "",
        explorers: [
            {
                API_URL: "https://api.scrollscan.com/api",
                API_KEY: process.env.ETHERSCAN_API_KEY_SCROLL || "",
                SITE_URL: "https://scrollscan.com",
            },
        ],
    },
    [Networks.zkevm]: {
        RPC: process.env.RPC_ZKEVM || "",
        explorers: [
            {
                API_URL: "https://api-zkevm.polygonscan.com/api",
                API_KEY: process.env.ETHERSCAN_API_KEY_ZKEVM || "",
                SITE_URL: "https://zkevm.polygonscan.com",
            },
        ],
    },
    [Networks.celo]: {
        RPC: process.env.RPC_CELO || "",
        explorers: [
            {
                API_URL: "https://api.celoscan.io/api",
                API_KEY: process.env.ETHERSCAN_API_KEY_CELO || "",
                SITE_URL: "https://celoscan.io",
            },
        ],
    },
    [Networks.metis]: {
        RPC: process.env.RPC_METIS || "",
        explorers: [
            {
                API_URL: "https://api.routescan.io/v2/network/mainnet/evm/1088/etherscan",
                SITE_URL: "https://explorer.metis.io",
            },
            { API_URL: "https://andromeda-explorer.metis.io/api ", SITE_URL: "https://andromeda-explorer.metis.io" },
        ],
    },
};
