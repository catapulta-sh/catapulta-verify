# catapulta-verify

Alternative Foundry verifier for nested `forge script` deployments. Provide your broadcast JSON file, and the [Catapulta](catapulta.sh) verifier will check every TX for deployments to verify at Etherscan and compatible block explorers, without the need of passing constructor arguments

## Usage

From the root of your Foundry project, run the following command to verify your smart contracts deployed by `forge script`. You must provide a node JSON RPC Endpoint, with `debug_traceTransaction` and debug namespace enabled.

With Node:

```
npx catapulta-verify --broadcastPath "broadcast/Deploy.s.sol/11155111/run-latest.json" --rpcUrl 'https://eth-sepolia.g.alchemy.com/v2/<API_KEY>' --etherscanApiKey <ETHERSCAN_API_KEY>
```

With Bun:

```
bunx catapulta-verify --broadcastPath "broadcast/Deploy.s.sol/11155111/run-latest.json" --rpcUrl 'https://eth-sepolia.g.alchemy.com/v2/<API_KEY>' --etherscanApiKey <ETHERSCAN_API_KEY>
```

## CLI Options

Below you can see all the CLI arguments and aliases:

```
  -b, --broadcastPath string     Path of the broadcast report json file to analyze the txs in search of smart
                                 contracts deployments.
  -h, --help                     Prints this usage guide
  -r, --rpcUrl string            RPC URL to fetch transaction details, mandatory to support for
                                 debug_traceTransaction. You can use Alchemy or Quicknode providers if
                                 available.
  -e, --etherscanUrl string      Etherscan API endpoint
  -k, --etherscanApiKey string   Etherscan API key
```

## Build from source

Install dependencies:

```bash
bun install
```

Build:

```bash
bun run build
```

This will generate a index.mjs file in /out directory, with all the dependencies needed to run with Node.js or Bun.

## Catapulta Pro

This is the Lite open source version of the Catapulta deployment platform verifier.

Catapulta aims to improve DevX for smart contracts deployments, allowing to deploy in +10 networks with zero config, automated verifications and collaborative deployment reports for both Foundry and Hardhat.

A tool for deployers, by deployers. Check it out in [catapulta.sh](https://catapulta.sh).
