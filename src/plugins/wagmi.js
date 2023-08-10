import { UseWagmiPlugin, createConfig, configureChains } from 'use-wagmi';
// import { createPublicClient, http } from 'viem';
import { publicProvider } from 'use-wagmi/providers/public';
import { MetaMaskConnector } from 'use-wagmi/connectors/metaMask';
// import { InjectedConnector } from 'use-wagmi/connectors/injected';
import {
  mainnet,
  polygon,
  bsc,
  avalanche,
  arbitrum,
  optimism,
} from '@wagmi/core/chains';

export default defineNuxtPlugin((nuxtApp) => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, polygon, bsc, avalanche, arbitrum, optimism],
    [publicProvider()]
  );

  // const chains = [mainnet];
  const config = createConfig({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      // new InjectedConnector({
      //   chains,
      // }),
    ],
    publicClient,
    webSocketPublicClient,
    // publicClient: createPublicClient({
    //   chain: mainnet,
    //   transport: http(),
    // }),
  });

  nuxtApp.vueApp.use(UseWagmiPlugin, config);
});
