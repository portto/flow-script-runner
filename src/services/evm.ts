import { useEffect, useState } from "react";
import Web3 from "web3";
import BloctoSDK, { EthereumProviderInterface } from "@blocto/sdk";

export interface ExtendedEthereumProviderInterface
  extends EthereumProviderInterface {
  enable: () => Promise<any>;
  chainId: string;
}

export interface ExtendedEvmBloctoSDK extends BloctoSDK {
  ethereum: ExtendedEthereumProviderInterface;
}
const isMainnet = process.env.REACT_APP_NETWORK === "mainnet";

export const supportedChains = [
  {
    name: "Ethereum Mainnet",
    chainId: "0x1",
    rpcUrls: [
      `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    ],
    environment: "mainnet",
  },
  {
    name: "Ethereum Sepolia",
    chainId: "0xaa36a7",
    rpcUrls: ["https://ethereum-sepolia.blockpi.network/v1/rpc/public"],
    faucet: "https://sepoliafaucet.com/",
    environment: "testnet",
  },
  {
    name: "Arbitrum Mainnet",
    chainId: "0xa4b1",
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    environment: "mainnet",
  },
  {
    name: "Arbitrum Sepolia Testnet",
    chainId: "0x66eee",
    rpcUrls: ["https://arbitrum-sepolia.blockpi.network/v1/rpc/public"],
    faucet: "https://faucet.quicknode.com/arbitrum/sepolia",
    environment: "testnet",
  },
  {
    name: "BSC",
    chainId: "0x38",
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    environment: "mainnet",
  },
  {
    name: "BSC Testnet",
    chainId: "0x61",
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    faucet: "https://testnet.binance.org/faucet-smart",
    environment: "testnet",
  },
  {
    name: "Avalanche Mainnet",
    chainId: "0xa86a",
    rpcUrls: ["https://rpc.ankr.com/avalanche"],
    environment: "mainnet",
  },
  {
    name: "Avalanche Testnet",
    chainId: "0xa869",
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    faucet: "https://faucet.avax-test.network/",
    environment: "testnet",
  },
  {
    name: "Polygon Mainnet",
    chainId: "0x89",
    rpcUrls: ["https://polygon-rpc.com"],
    environment: "mainnet",
  },
  {
    name: "Polygon Amoy Testnet",
    chainId: "0x13882",
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    faucet: "https://faucet.polygon.technology/",
    environment: "testnet",
  },
  {
    name: "Optimism Mainnet",
    chainId: "0xa",
    rpcUrls: ["https://mainnet.optimism.io"],
    environment: "mainnet",
  },
  {
    name: "Optimism Sepolia Testnet",
    chainId: "0xaa37dc",
    rpcUrls: ["https://sepolia.optimism.io"],
    faucet: "https://faucet.quicknode.com/optimism/sepolia",
    environment: "testnet",
  },
  {
    name: "Base",
    chainId: "0x2105",
    rpcUrls: ["https://mainnet.base.org"],
    environment: "mainnet",
  },
  {
    name: "Base Sepolia Testnet",
    chainId: "0x14a34",
    rpcUrls: ["https://sepolia.base.org"],
    faucet: "https://faucet.quicknode.com/base/sepolia",
    environment: "testnet",
  },
  {
    name: "Zora",
    chainId: "0x76adf1",
    rpcUrls: ["https://rpc.zora.energy"],
    environment: "mainnet",
  },
  {
    name: "Zora Sepolia Testnet",
    chainId: "0x3b9ac9ff",
    rpcUrls: ["https://sepolia.rpc.zora.energy"],
    faucet: "https://testnet.zora.co",
    environment: "testnet",
  },
  {
    name: "Scroll",
    chainId: "0x82750",
    rpcUrls: ["https://rpc.scroll.io"],
    environment: "mainnet",
  },
  {
    name: "Scroll Sepolia Testnet",
    chainId: "0x8274f",
    rpcUrls: ["https://sepolia-rpc.scroll.io"],
    faucet: "https://docs.scroll.io/en/user-guide/faucet/",
    environment: "testnet",
  },
  {
    name: "Linea",
    chainId: "0xe708",
    rpcUrls: ["https://rpc.linea.build"],
    environment: "mainnet",
  },
  {
    name: "zKatana Sepolia Testnet",
    chainId: "0x133e40",
    rpcUrls: ["https://rpc.startale.com/zkatana"],
    environment: "testnet",
  },
  {
    name: "Blast",
    chainId: "0x13e31",
    rpcUrls: ["https://rpc.blast.io"],
    environment: "mainnet",
  },
  {
    name: "Blast Sepolia Testnet",
    chainId: "0xa0c71fd",
    rpcUrls: ["https://sepolia.blast.io"],
    faucet: "https://faucet.quicknode.com/blast/sepolia",
    environment: "testnet",
  },
  {
    name: "Merlin",
    chainId: "0x1068",
    rpcUrls: ["https://rpc.merlinchain.io"],
    environment: "mainnet",
  },
  {
    name: "Merlin Testnet",
    chainId: "0xA7B14",
    rpcUrls: ["https://testnet-rpc.merlinchain.io"],
    faucet: "https://coinfaucet.eu/en/btc-testnet/",
    environment: "testnet",
  },
  {
    name: "Iliad Testnet",
    chainId: "0x5e9",
    rpcUrls: ["https://testnet.storyrpc.io/"],
    environment: "testnet",
  },
];

const bloctoSDK = new BloctoSDK({
  ethereum: {
    // (required) chainId to be used
    chainId: isMainnet ? "0x1" : "0xaa36a7",
    // (required for Ethereum) JSON RPC endpoint
    rpc: isMainnet
      ? `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
      : "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
    walletServer: process.env.REACT_APP_WALLET_SERVER,
  },
  appId: process.env.REACT_APP_DAPP_ID,
}) as ExtendedEvmBloctoSDK;

bloctoSDK.ethereum.loadSwitchableNetwork(supportedChains);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const web3 = new Web3(bloctoSDK.ethereum);

export { web3, bloctoSDK };

export const useEthereum = (): {
  account: string | null;
  chainId: string | null;
  ethereum: ExtendedEthereumProviderInterface;
  connect: () => Promise<any>;
  disconnect: () => Promise<any>;
} => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(
    bloctoSDK.ethereum.chainId
  );
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      setAccount(accounts[0]);
    };
    const handleChainChanged = (chainId: string) => {
      setChainId(chainId);
    };
    const handleDisconnect = () => {
      setAccount(null);
    };
    bloctoSDK.ethereum.on("accountsChanged", handleAccountsChanged);
    bloctoSDK.ethereum.on("chainChanged", handleChainChanged);
    bloctoSDK.ethereum.on("disconnect", handleDisconnect);
    return () => {
      bloctoSDK.ethereum.off("accountsChanged", handleAccountsChanged);
      bloctoSDK.ethereum.off("chainChanged", handleChainChanged);
      bloctoSDK.ethereum.off("disconnect", handleDisconnect);
    };
  }, []);

  return {
    account,
    chainId,
    ethereum: bloctoSDK.ethereum,
    connect: async () => {
      const accounts = await bloctoSDK.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      return accounts;
    },
    disconnect: () =>
      bloctoSDK.ethereum.request({ method: "wallet_disconnect" }),
  };
};
