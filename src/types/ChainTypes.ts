export enum OtherChain {
  Flow = "flow",
  Aptos = "aptos",
  Ethereum = "ethereum",
}

export enum EvmChain {
  Ethereum = "ethereum",
  Bsc = "bsc",
  Polygon = "polygon",
  Avalanche = "avalance",
  Arbitrum = "arbitrum",
  Optimism = "optimism",
}

export enum EvmChainId {
  Ethereum = "0x1",
  Bsc = "0x38",
  BscTestnet = "0x61",
  Polygon = "0x89",
  PolygonTestnet = "0x13881",
  Avalanche = "0xa86a",
  AvalancheTestnet = "0xa869",
  Arbitrum = "0xa4b1",
  Optimism = "0x000a",
}

export type ChainsType = OtherChain;

export const Chains = { ...OtherChain };
