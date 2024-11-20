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
  explorers: ExplorerConfig[];
};

// custom explorer configs
export const NETWORK_CONFIGS: Record<string, NetworkConfig> = {
  [Networks.metis]: {
    explorers: [
      {
        API_URL: "https://andromeda-explorer.metis.io/api ",
        SITE_URL: "https://andromeda-explorer.metis.io",
      },
    ],
  },
};
