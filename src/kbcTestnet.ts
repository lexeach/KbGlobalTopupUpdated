// import { defineChain } from '../../utils/chain/defineChain.js'
import { defineChain } from '/Users/nasir/Desktop/Personal/Gautam/update-code-with-connect-btn/node_modules/viem/utils/chain/defineChain.ts'

export const kbcTestnet = /*#__PURE__*/ defineChain({
  id: 22000,
  name: 'KBCTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'KBC',
    symbol: 'tKBC',
  },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.kbcfoundation.com'] },
  },
  blockExplorers: {
    default: {
      name: 'KBCScan',
      url: 'https://testnet-scan.kbcfoundation.com',
      apiUrl: 'https://testnet-scan.kbcfoundation.com/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 1742248,
    },
  },
  testnet: true,
})
