import React, { Dispatch, useCallback } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import type { EthereumTypes } from "@blocto/sdk";
import EvmTxForm from "./EvmTxForm";

const EvmSendEditor = ({
  setRequestObject,
  account,
}: {
  setRequestObject: Dispatch<EthereumTypes.EIP1193RequestPayload | undefined>;
  account: string | null;
}): ReactJSXElement => {
  const setTransactionObject = useCallback(
    (params: EthereumTypes.EIP1193RequestPayload["params"] | undefined) => {
      setRequestObject({
        method: "eth_sendTransaction",
        params,
      });
    },
    [setRequestObject]
  );

  return (
    <EvmTxForm setTransactionObject={setTransactionObject} account={account} />
  );
};

export default EvmSendEditor;
