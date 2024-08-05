# Tranching Block Explorer App
## Overview
`Tranching Block Explorer App` is a front-end app providing an easy-to-use interface for users to view and inspect transactions, blocks, contracts and more on [Tranching](https://www.tidalchain.com/) blockchain.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Installation

```bash
$ npm install
```

### Environment configs
Public environment configs are stored in `src/configs` folder and are named as `<appEnvironment>.config.json` where `appEnvironment` is the name of the environment set in `VITE_APP_ENVIRONMENT` env variable.
Currently there are 3 different environments for the project: `local`, `staging` and `production`, each with its corresponding configuration file.

### Adding a new network to the config
In order to change the configuration for the environment, you need to change its configuration file. By default, there are 4 networks configured for the `local` environment: `local`, `stage`, `testnet` and `mainnet`. Your local network might be different from what is configured in `local.config.json` in such case you should edit the config and set correct values for your setup. You can also add new items to the `networks` array and they will automatically appear in the networks dropdown on UI. 

Example of `local.config.json` extended with the new network:

```
import stagingConfig from "./staging.config";

import type { EnvironmentConfig } from ".";

const config: EnvironmentConfig = {
  networks: [
    {
      apiUrl: "http://localhost:3020",
      verificationApiUrl: "https://micro2-testnet-explorer.micro.dev",
      hostnames: ["localhost"],
      icon: "/images/icons/micro-arrows.svg",
      l1ExplorerUrl: "https://calibration.filfox.info/en",
      l2ChainId: 270,
      l2NetworkName: "Local",
      l2WalletUrl: "https://calibration.staging-portal.micro.dev/",
      maintenance: false,
      name: "local",
      published: true,
      rpcUrl: "http://localhost:3050",
    },
    // next network has been just added
    {
      apiUrl: "http://localhost:3030",
      verificationApiUrl: "https://micro2-testnet-explorer.micro.dev",
      hostnames: ["localhost"],
      icon: "/images/icons/micro-arrows.svg",
      l1ExplorerUrl: "https://calibration.filfox.info/en",
      l2ChainId: 270,
      l2NetworkName: "Local Hyperchain",
      l2WalletUrl: "https://calibration.staging-portal.micro.dev/",
      maintenance: false,
      name: "local-hyperchain",
      published: true,
      rpcUrl: "http://localhost:3070",
    },
    ...stagingConfig.networks,
  ],
};

export default config;
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

### Run End-to-End Tests with [Playwright](https://www.playwright.io/)

```sh
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Production links
 - [Web Application]()
 - [Storybook]()
