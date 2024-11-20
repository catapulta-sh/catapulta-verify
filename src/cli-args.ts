import { parse } from "ts-command-line-args";
import type { InputParams } from "./types";

export const args = parse<InputParams>(
  {
    broadcastPath: {
      type: String,
      alias: "b",
      description:
        "Path of the broadcast report json file to analyze the txs in search of smart contracts deployments.",
    },
    help: {
      type: Boolean,
      optional: true,
      alias: "h",
      description: "Prints this usage guide",
    },
    rpcUrl: {
      type: String,
      optional: true,
      alias: "r",
      description:
        "RPC URL to fetch transaction details, mandatory to support for debug_traceTransaction. You can use Alchemy or Quicknode providers if available.",
    },
    explorerUrl: {
      type: String,
      optional: true,
      alias: "e",
      description: "Etherscan API endpoint",
    },
    etherscanApiKey: {
      type: String,
      optional: true,
      alias: "k",
      description: "Etherscan API key",
    },
  },
  {
    helpArg: "help",
    headerContentSections: [
      {
        header: "catapulta-verify",
        content:
          'Verify smart contracts at Etherscan using Forge broadcast reports and debug_traceTransaction. This is the "lite" open source version of Catapulta.sh, a zero config deployment tool for Foundry scripts.\n\nUsage:\n\n npx catapulta-verify -b broadcast/Script.sol/11155111/run-latest.json --etherscan-url <URL> --etherscan-api-key <API_KEY> \n\nDocumentation\n\nCheck out https://github.com/catapulta-sh/verify repository to see the full documentation.\n\nCatapulta, plug-n-play deployment platform\n\nIf you want to remove all boilerplate configs like RPC Urls, Etherscan API keys, be able to automatize all verifications without long commands at deployment time, check out https://catapulta.sh website to discover the full version of Catapulta.',
      },
    ],
  },
);
