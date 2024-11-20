import { type ExplorerConfig, VERBOSE } from "../config";
import { delay } from "./misc";

export const submitVerification = async (verificationInfo: any, explorerUrl: string) => {
    const queryParams = {
        chainId: verificationInfo.chainId,
        apikey: verificationInfo.apikey,
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
    // etherscan is not super stable, therefore sometimes there are issues and for reporting it's useful to log the request
    if (VERBOSE) console.log("etherscan request", JSON.stringify(params));
    const request = await fetch(`${explorerUrl}?${formattedParams}`, params);

    return await request.json();
};

// checks if the smart contract is already verified before trying to verify it
export const checkIfVerified = async (deploymentAddress: string, explorer: ExplorerConfig, chainId: number) => {
    const params = {
        apikey: explorer.API_KEY || "",
        chainid: String(chainId),
        address: deploymentAddress,
        module: "contract",
        action: "getabi",
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
};

export const checkIfVisible = async (deploymentAddress: string, explorer: ExplorerConfig, chainId: number) => {
    const params = {
        apikey: explorer.API_KEY || "",
        chainid: String(chainId),
        contractaddresses: deploymentAddress,
        module: "contract",
        action: "getcontractcreation",
    };

    const formattedParams = new URLSearchParams(params).toString();

    await delay(100);
    const request = await fetch(`${explorer.API_URL}?${formattedParams}`);
    const { result }: any = await request.json();
    return Boolean(result);
};

/*
   Etherscan needs time to process the deployment, depending of the network load could take more or less time.
*/
export const waitTillVisible = async (
    deploymentAddress: string,
    explorer: ExplorerConfig,
    chainId: number,
): Promise<void> => {
    let visible = false;
    let logged = false;

    while (!visible) {
        visible = await checkIfVisible(deploymentAddress, explorer, chainId);
        if (!visible) {
            if (!logged) {
                console.log("Waiting for on-chain settlement...");
                logged = true;
            }
            await delay(5000);
        }
    }
};

/**
    Status response:
     0: Error in the verification
     1: Verification completed
     2: Verification pending
*/
export const checkVerificationStatus = async (
    GUID: string,
    explorer: ExplorerConfig,
    chainId: number,
): Promise<{
    status: number;
    message: string;
}> => {
    const params = {
        apikey: explorer.API_KEY || "",
        chainId: String(chainId),
        guid: GUID,
        module: "contract",
        action: "checkverifystatus",
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
};
