import React, { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { supportedChains, bloctoSDK, useEthereum } from "../services/evm";

const supportedMainnetChains = supportedChains.filter(
  ({ environment }) => environment === "mainnet"
);
const supportedTestnetChains = supportedChains.filter(
  ({ environment }) => environment === "testnet"
);

const EvmChainSelect: React.FC = ({}): ReactJSXElement => {
  const { chainId: currentChainId } = useEthereum();

  return (
    <Select
      width="200px"
      value={currentChainId || ""}
      onChange={(e) => {
        bloctoSDK.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: e.target.value }],
        });
      }}
    >
      <option disabled>Testnet</option>
      {supportedTestnetChains.map(({ name, chainId }) => (
        <option key={chainId} value={chainId}>
          {name}
        </option>
      ))}
      <option disabled>Mainnet</option>
      {supportedMainnetChains.map(({ name, chainId }) => (
        <option key={chainId} value={chainId}>
          {name}
        </option>
      ))}
    </Select>
  );
};

export default EvmChainSelect;
