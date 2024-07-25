import { Chain } from 'wagmi';

export const kbcMainnet: Chain = {
  id: 11000,
  name: 'KBC',
  network: 'kbc',
  nativeCurrency: {
    name: 'KBC',
    symbol: 'KBC',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet-rpc.kbcfoundation.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'KBC Explorer',
      url: 'https://scan.kbcfoundation.com/',
    },
  },
  testnet: false,
};
