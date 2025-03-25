import { etherscanExplorers } from "@bgd-labs/toolbox";

export function getEtherscan(chainId: number) {
  const explorer =
    etherscanExplorers[chainId as keyof typeof etherscanExplorers];
  if (explorer)
    return {
      API_URL: "https://api.etherscan.io/v2/api",
      API_KEY: process.env.ETHERSCAN_API_KEY,
    };
}
