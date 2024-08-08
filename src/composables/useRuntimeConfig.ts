import type { NetworkConfig, RuntimeConfig } from "@/configs";

export const DEFAULT_NETWORK: NetworkConfig = {
  apiUrl: "https://block-explorer-api.testnets.micro.dev",
  verificationApiUrl: "https://micro2-testnet-explorer.micro.dev",
  bridgeUrl: "https://calibration.bridge.micro.io",
  hostnames: ["https://calibration.explorer.micro.io"],
  icon: "/images/icons/micro-arrows.svg",
  l1ExplorerUrl: "https://calibration.filfox.info/en",
  l2ChainId: 280,
  l2NetworkName: "zkAmoeba Testnet",
  l2WalletUrl: "https://calibration.portal.micro.io/",
  maintenance: false,
  name: "calibration",
  published: true,
  rpcUrl: "https://testnet.era.micro.dev",
};

export default (): RuntimeConfig => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const runtimeConfig = window && window["##runtimeConfig"];

  return {
    version: import.meta.env?.VITE_VERSION || "1.0.0",
    sentryDSN: runtimeConfig?.sentryDSN || import.meta.env?.VITE_SENTRY_DSN,
    appEnvironment: runtimeConfig?.appEnvironment || import.meta.env?.VITE_APP_ENVIRONMENT || "default",
    environmentConfig: runtimeConfig?.environmentConfig,
  };
};
