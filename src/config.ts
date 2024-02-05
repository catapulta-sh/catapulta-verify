import { createClient, http, Chain, Client, Transport } from "viem";
import {
    polygon,
    mainnet,
    avalanche,
    arbitrum,
    goerli,
    optimism,
    bsc,
    bscTestnet,
    sepolia,
    gnosis,
    base,
    scroll,
    polygonZkEvm,
} from "viem/chains";
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
    [Networks.bnb]: process.env.ETHERSCAN_API_KEY_BNB || "",
    [Networks.bnbTestnet]: process.env.ETHERSCAN_API_KEY_BNB_TESTNET || "",
    [Networks.base]: process.env.ETHERSCAN_API_KEY_BASE || "",
    [Networks.metis]: process.env.ETHERSCAN_API_KEY_METIS || "",
    [Networks.gnosis]: process.env.ETHERSCAN_API_KEY_GNOSIS || "",
    [Networks.scroll]: process.env.ETHERSCAN_API_KEY_SCROLL || "",
    [Networks.zkevm]: process.env.ETHERSCAN_API_KEY_ZKEVM || "",
};

export const ETHERSCAN_API_URL: {
    [key: string]: string;
} = {
    [Networks.avalanche]: "https://api.routescan.io/v2/network/mainnet/evm/43114/etherscan",
    [Networks.avalancheFuji]: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
    [Networks.metis]: "https://api.routescan.io/v2/network/mainnet/evm/1088/etherscan",
};

export const DEFAULT_RPC_URLS: {
    [key: string]: string | undefined;
} = {
    [Networks.polygon]: process.env.RPC_POLYGON,
    [Networks.main]: process.env.RPC_MAINNET,
    [Networks.arbitrum]: process.env.RPC_ARBITRUM,
    [Networks.avalanche]: process.env.RPC_AVALANCHE,
    [Networks.optimism]: process.env.RPC_OPTIMISM,
    [Networks.goerli]: process.env.RPC_GOERLI,
    [Networks.sepolia]: process.env.RPC_SEPOLIA,
    [Networks.bnb]: process.env.RPC_BNB,
    [Networks.bnbTestnet]: process.env.RPC_BNB_TESTNET,
    [Networks.base]: process.env.RPC_BASE,
    [Networks.gnosis]: process.env.RPC_GNOSIS,
    [Networks.scroll]: process.env.RPC_SCROLL,
    [Networks.zkevm]: process.env.RPC_ZKEVM,
};

export const CHAINS: {
    [key: string]: Chain;
} = {
    [Networks.polygon]: polygon,
    [Networks.main]: mainnet,
    [Networks.arbitrum]: arbitrum,
    [Networks.avalanche]: avalanche,
    [Networks.optimism]: optimism,
    [Networks.goerli]: goerli,
    [Networks.sepolia]: sepolia,
    [Networks.bnb]: bsc,
    [Networks.bnbTestnet]: bscTestnet,
    [Networks.base]: base,
    [Networks.gnosis]: gnosis,
    [Networks.scroll]: scroll,
    [Networks.zkevm]: polygonZkEvm,
};

export function getClient({ chainId, rpcUrl, apiUrl }: { chainId: string; rpcUrl?: string; apiUrl?: string }) {
    return createClient({
        transport: http(rpcUrl || DEFAULT_RPC_URLS[chainId]),
        chain: {
            ...CHAINS[chainId],
            blockExplorers: {
                default: {
                    ...(CHAINS[chainId].blockExplorers?.default as any),
                    apiUrl: apiUrl || ETHERSCAN_API_URL[chainId] || CHAINS[chainId].blockExplorers?.default.apiUrl,
                },
            },
        },
    });
}
