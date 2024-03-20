![Catapulta Banner](https://github.com/catapulta-sh/.github/assets/11179847/252be2aa-7a89-44f1-98eb-aa647d0dc5f3)

# catapulta-verify

[![Telegram Group](https://img.shields.io/endpoint?color=neon&url=https%3A%2F%2Ftg.sumanjay.workers.dev%2Fsolidity_deployers)](https://t.me/solidity_deployers) [![npm version](https://badge.fury.io/js/catapulta-verify.svg)](https://badge.fury.io/js/catapulta-verify)

Alternative Foundry verifier for nested `forge script` deployments. Provide your broadcast JSON file, and the [Catapulta](https://catapulta.sh?ref=lite) verifier will check every TX for deployments to verify at Etherscan and compatible block explorers, without the need of passing constructor arguments

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
  -e, --explorerUrl string      Etherscan API endpoint
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

This results in simpler and shorter commands to broadcast and verify Forge scripts deployments:

```
npx catapulta script 'scripts/Deploy.s.sol' --network sepolia
```

A tool for deployers, by deployers. Check it out at [Catapulta.sh](https://catapulta.sh?ref=lite).
