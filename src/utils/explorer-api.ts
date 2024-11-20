import { type ExplorerConfig } from "../config";
import { checkIfVisible } from "./api";
import { delay } from "./misc";

/*
   Etherscan needs time to process the deployment, depending of the network load could take more or less time.
*/
export const waitTillVisible = async (chainId: number, explorer: ExplorerConfig, address: string): Promise<void> => {
  let visible = false;
  let logged = false;

  while (!visible) {
    visible = await checkIfVisible(chainId, explorer, address);
    if (!visible) {
      if (!logged) {
        console.log("Waiting for on-chain settlement...");
        logged = true;
      }
      await delay(5000);
    }
  }
};
