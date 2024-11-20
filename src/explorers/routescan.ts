import routescan from "./routescan.json";

export function getRouteScan(chainId: number) {
    const explorer = routescan.find((r) => r.chainId === chainId);
    if (explorer) return { API_URL: explorer.api };
}
