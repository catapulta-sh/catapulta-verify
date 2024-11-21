import etherscan from "./etherscan.json";

export function getEtherscan(chainId: number) {
  const explorer = etherscan.find((e) => e.chainId === chainId);
  if (explorer)
    return {
      API_URL: "https://api.etherscan.io/v2/api",
      API_KEY: process.env.ETHERSCAN_API_KEY,
    };
}
