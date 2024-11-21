import type { ExplorerConfig } from "../config";

export async function checkVerificationStatus(chainId: number, explorer: ExplorerConfig, guid: string) {
  const params = {
    chainid: String(chainId),
    guid,
    module: "contract",
    action: "checkverifystatus",
    ...(explorer.API_KEY ? { apikey: explorer.API_KEY } : {}),
  };

  const formattedParams = new URLSearchParams(params).toString();
  try {
    const request = await fetch(`${explorer.API_URL}?${formattedParams}`);

    const { status, result }: any = await request.json();
    if (result === "Pending in queue") {
      return {
        status: 2,
        message: result,
      };
    }
    if (result !== "Fail - Unable to verify") {
      if (status === "1") {
        return {
          status: 1,
          message: result,
        };
      }
    }
    return {
      status: 0,
      message: result,
    };
  } catch (err) {
    return {
      status: 2,
      message: `Couldn't check the verification status. Err: ${err}`,
    };
  }
}

export async function checkIfVisible(chainId: number, explorer: ExplorerConfig, address: string) {
  const params = {
    chainid: String(chainId),
    contractaddresses: address,
    module: "contract",
    action: "getcontractcreation",
    ...(explorer.API_KEY ? { apikey: explorer.API_KEY } : {}),
  };

  const formattedParams = new URLSearchParams(params).toString();

  const request = await fetch(`${explorer.API_URL}?${formattedParams}`);
  const { result }: any = await request.json();
  return Boolean(result);
}

export async function checkIfVerified(chainId: number, explorer: ExplorerConfig, address: string) {
  const params = {
    chainid: String(chainId),
    address: address,
    module: "contract",
    action: "getabi",
    ...(explorer.API_KEY ? { apikey: explorer.API_KEY } : {}),
  };

  const formattedParams = new URLSearchParams(params).toString();

  try {
    const request = await fetch(`${explorer.API_URL}?${formattedParams}`);

    const { status, result }: any = await request.json();

    if (status === "1") {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    process.exit(2);
  }
}

export async function submitVerification(
  chainId: number,
  explorer: ExplorerConfig,
  verificationInfo: {
    codeformat: string;
    chainid: string;
    sourceCode: string;
    // typo in the official api v1 and v2 :shrug:
    constructorArguements?: string;
    contractaddress: string;
    contractname: string;
    compilerversion: string;
  },
) {
  console.log("here", verificationInfo);
  const queryParams = {
    chainid: String(chainId),
    ...(explorer.API_KEY ? { apikey: explorer.API_KEY } : {}),
    module: "contract",
    action: "verifysourcecode",
  };
  const formattedParams = new URLSearchParams(queryParams).toString();
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(verificationInfo).toString(),
  };
  const url = `${explorer.API_URL}?${formattedParams}`;
  console.log(url);
  const request = await fetch(url, params);

  return await request.json();
}
