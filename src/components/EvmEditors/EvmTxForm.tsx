import React, { useEffect, useState, Dispatch } from "react";
import { Box, Textarea, Grid } from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import type { EthereumTypes } from "@blocto/sdk";
import { web3 } from "../../services/evm";

interface EvmTxFormProps {
  setTransactionObject: Dispatch<
    EthereumTypes.EIP1193RequestPayload["params"] | undefined
  >;
  account: string | null;
  isCustom?: boolean;
  customParams?: any;
}

const EvmTxForm = ({
  setTransactionObject,
  account,
  isCustom = false,
  customParams,
}: EvmTxFormProps): ReactJSXElement => {
  const [fromString, setFrom] = useState<string>(account || "");
  const [toString, setTo] = useState<string>("");
  const [valueString, setValue] = useState<string>("");
  const [dataString, setData] = useState<string>("");

  useEffect(() => {
    if (account) {
      const sendObj: {
        from: string;
        to?: string;
        value?: string;
        data?: string;
      } = {
        from: fromString,
      };
      if (toString) {
        sendObj.to = toString;
      }
      if (valueString) {
        try {
          sendObj.value = web3.utils.toHex(valueString);
        } catch (e) {
          setValue("");
        }
      }
      if (dataString) {
        sendObj.data = dataString;
      }
      setTransactionObject([sendObj]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, fromString, toString, dataString, valueString]);
  useEffect(() => {
    if (!isCustom) {
      setFrom(account || "");
    } else {
      setFrom(customParams.from || "");
      setTo(customParams.to || "");
      setValue(customParams.value || "");
      setData(customParams.data || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, isCustom]);

  return (
    <Grid
      templateColumns="min-content 1fr"
      alignItems="center"
      gap={6}
      width="100%"
    >
      <Box mx="10px">From:</Box>
      <Textarea
        rows={1}
        value={fromString}
        onChange={(e) => {
          setFrom(e.target.value);
        }}
      />
      <Box mx="10px">To:</Box>
      <Textarea
        rows={1}
        value={toString}
        onChange={(e) => {
          setTo(e.target.value);
        }}
      />
      <Box mx="10px">Value:</Box>
      <Textarea
        rows={1}
        value={valueString}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Box mx="10px">Data:</Box>
      <Textarea
        rows={3}
        value={dataString}
        onChange={(e) => {
          setData(e.target.value);
        }}
      />
    </Grid>
  );
};

export default EvmTxForm;
