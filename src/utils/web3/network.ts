export default [
  {
    chainId: 1,
    chainName: 'Ethereum Mainnet',
    name: 'eth',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [
      'https://eth.llamarpc.com',
      'https://ethereum.blockpi.network/v1/rpc/public',
      'https://eth-mainnet.public.blastapi.io',
      'https://eth.rpc.blxrbdn.com',
      'https://eth-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf',
      'https://singapore.rpc.blxrbdn.com',
      'https://ethereum.publicnode.com',
      'https://rpc.mevblocker.io',
      'https://eth-rpc.gateway.pokt.network',
      'https://1rpc.io/eth',
      'https://api.zmok.io/mainnet/oaen6dy8ff6hju9k',
    ],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  {
    chainId: 97,
    chainName: 'Binance Smart Chain Testnet',
    name: 'bsc',
    nativeCurrency: {
      name: 'tBNB',
      symbol: 'tBNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-2-s2.bnbchain.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
  {
    chainId: 56,
    chainName: 'Binance Smart Chain Mainnet',
    name: 'bsc',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: [
      'https://bsc.blockpi.network/v1/rpc/public',
      'https://bsc-dataseed4.defibit.io',
      'https://koge-rpc-bsc.48.club',
      'https://bsc-dataseed2.binance.org',
      'https://bsc.publicnode.com',
    ],
    blockExplorerUrls: ['https://bscscan.com'],
  },
];