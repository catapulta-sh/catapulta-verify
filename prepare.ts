import { writeFileSync } from "node:fs";

type RouteScanResponse = {
  items: {
    workspace: string;
    chainId: string;
  }[];
};

async function getRoutescan() {
  const result = await fetch("https://cdn-canary.routescan.io/api/evm/all/explorers");
  const data = (await result.json()) as RouteScanResponse;
  const formatted = data.items.map((d) => ({
    api: `https://api.routescan.io/v2/network/${d.workspace}/evm/${d.chainId}/etherscan`,
    explorer: `${d.chainId}.routescan.io`,
    chainId: Number(d.chainId),
  }));
  writeFileSync("src/explorers/routescan.json", JSON.stringify(formatted, null, 2));
}

type EtherscanResponse = {
  result: {
    blockexplorer: string;
    chainid: string;
    apiurl: string;
  }[];
};
async function getEtherscan() {
  const result = await fetch("https://api.etherscan.io/v2/chainlist");
  const data = (await result.json()) as EtherscanResponse;
  const formatted = data.result.map((d) => ({
    api: d.apiurl,
    explorer: d.blockexplorer,
    chainId: Number(d.chainid),
  }));
  writeFileSync("src/explorers/etherscan.json", JSON.stringify(formatted, null, 2));
}

getRoutescan();
getEtherscan();
