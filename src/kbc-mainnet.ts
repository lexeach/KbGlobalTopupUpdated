// import { defineChain } from '../../utils/chain/defineChain.js'
import { defineChain } from '/Users/nasir/Desktop/Personal/Gautam/update-code-with-connect-btn/node_modules/viem/utils/chain/defineChain.ts'

export const kbcMainnet = /*#__PURE__*/ defineChain({
  id: 11000,
  name: 'KBCMainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'KBC',
    symbol: 'KBC',
  },
  rpcUrls: {
    default: { http: ['https://mainnet-rpc.kbcfoundation.com'] },
  },
  blockExplorers: {
    default: {
      name: 'KBCScan',
      url: 'https://scan.kbcfoundation.com',
      apiUrl: 'https://scan.kbcfoundation.com/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 1742248,
    },
  },
  testnet: false,
})
