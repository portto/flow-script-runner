import Web3 from "web3";
import BloctoSDK from "@blocto/sdk";
import { ExtendedEvmBloctoSDK } from "./rinkeby";

const isMainnet = process.env.REACT_APP_NETWORK === "mainnet";

const bloctoSDK = new BloctoSDK({
  ethereum: {
    chainId: isMainnet ? "0x38" : "0x61",
    rpc: isMainnet
      ? "https://bsc-dataseed.binance.org/"
      : "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
}) as ExtendedEvmBloctoSDK;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const web3 = new Web3(bloctoSDK.ethereum);

export { web3, bloctoSDK };