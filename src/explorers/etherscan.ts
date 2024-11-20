// https://docs.etherscan.io/etherscan-v2/getting-started/supported-chains
// incomplete list
const supportedChains = [
  1, 11155111, 17000, 56, 97, 137, 80002, 8453, 84532, 42161, 42170, 421614,
  59144, 59141, 250, 4002, 81457, 168587773, 10, 11155420, 43114, 43113, 42220,
  44787, 100, 534352, 534351, 324, 300,
];

export function getEtherscan(chainId: number) {
  const explorer = supportedChains.find((id) => id === chainId);
  if (explorer)
    return {
      API_URL: "https://api.etherscan.io/v2/api",
      API_KEY: process.env.ETHERSCAN_API_KEY,
    };
}
