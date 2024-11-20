import "dotenv/config";
import { describe, expect, it } from "vitest";
import { getEtherscan } from "../explorers/etherscan";
import { getRouteScan } from "../explorers/routescan";
import { checkIfVerified, checkIfVisible, checkVerificationStatus, submitVerification } from "./api";

describe("api", { timeout: 30000 }, () => {
  it("etherscan: checkVerificationStatus", async () => {
    const mainnetEtherScan = getEtherscan(1)!;
    const result = await checkVerificationStatus(
      1,
      mainnetEtherScan,
      "tdx4rpicxvzki2smtvwjyvzhbtvhnnyz2cvipj4zcdfgvkdlaq",
    );
    console.log(result);
    expect(result.status).toBe(1);
  });

  it("routescan: checkVerificationStatus", async () => {
    const mainnetRouteScan = getRouteScan(1)!;
    const result = await checkVerificationStatus(
      1,
      mainnetRouteScan,
      "tdx4rpicxvzki2smtvwjyvzhbtvhnnyz2cvipj4zcdfgvkdlaq",
    );
    expect(result.status).toBe(1);
  });

  it("etherscan: checkIfVisible", async () => {
    const mainnetEtherScan = getEtherscan(1)!;
    const result = await checkIfVisible(1, mainnetEtherScan, "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2");
    expect(result).toBe(true);
  });

  it("etherscan: checkIfVerified", async () => {
    const mainnetEtherScan = getEtherscan(1)!;
    const result = await checkIfVerified(1, mainnetEtherScan, "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2");
    expect(result).toBe(true);
  });

  it.skip("etherscan: submitVerification", async () => {
    const mainnetEtherScan = getEtherscan(1)!;
    const result = await submitVerification(1, mainnetEtherScan, {
      chainId: 1,
    });
    expect(result).toBe(true);
  });
});
