import { isHex } from "./misc";

export const getChainId = async (rpcUrl: string): Promise<number> => {
  try {
    const request = await fetch(rpcUrl, {
      method: "POST",
      body: JSON.stringify({
        method: "eth_chainId",
        params: [],
        id: 1,
        jsonrpc: "2.0",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const response = await request.json();

    if (response.error) {
      throw "RPC.chainId.ResponseError";
    }
    if (response.result && isHex(response.result)) {
      return Number(response.result);
    }
    throw "RPC.chainId.CantParse";
  } catch (error) {
    console.log("[Error] Cant connect to RPC provider. Exiting.");
    process.exit(2);
  }
};

export const getTxInternalCalls = async (txHash: string, rpcUrl: string) => {
  try {
    const response = await fetch(rpcUrl, {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "debug_traceTransaction",
        params: [
          txHash,
          {
            tracer: "callTracer",
          },
        ],
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const trace = await response.json();

    if (!trace || trace.error) {
      if (trace?.error?.message) console.error("RPC response:", trace.error.message);
      console.error("[catapulta-verify] RPC does not support debug_traceTransaction. Exiting.");
      process.exit(2);
    }

    return trace;
  } catch (error) {
    console.error("[catapulta-verify] RPC does not support debug_traceTransaction. Exiting.");
    process.exit(2);
  }
};
