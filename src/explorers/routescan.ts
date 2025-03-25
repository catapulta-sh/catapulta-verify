import { routescanExplorers } from "@bgd-labs/toolbox";

export function getRouteScan(chainId: number) {
  const explorer =
    routescanExplorers[chainId as keyof typeof routescanExplorers];
  if (explorer) return { API_URL: explorer.api };
}
