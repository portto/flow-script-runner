import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import {
  Box,
  Text,
  Grid,
  Flex,
  IconButton,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import type { EthereumTypes } from "@blocto/sdk";
import EvmTxForm from "./EvmTxForm";

interface EvmBatchTxEditorProps {
  setRequestObject: Dispatch<
    SetStateAction<EthereumTypes.EIP1193RequestPayload | undefined>
  >;
  account: string | null;
}

const EvmBatchTxEditor = ({
  setRequestObject,
  account,
}: EvmBatchTxEditorProps): ReactJSXElement => {
  const [revert, setRevert] = useState<string>("true");
  const [txs, setTxs] = useState<any[]>([{}]);
  useEffect(() => {
    if (account) {
      setRequestObject({
        method: "wallet_sendMultiCallTransaction",
        params: [txs, revert === "true"],
      });
    }
  }, [account, setRequestObject, revert, txs]);

  return (
    <>
      <Grid templateRows="repeat(4, min-content)" gap="10px">
        <Box fontWeight="bold">Revert</Box>
        <RadioGroup
          value={revert}
          onChange={(e) => {
            setRevert(e);
          }}
        >
          <Flex gap="15px">
            <Radio value="true">true</Radio>
            <Radio value="false">false</Radio>
          </Flex>
        </RadioGroup>

        <Flex>
          <Box fontWeight="bold">Transaction</Box>
          <IconButton
            ml={2}
            aria-label="Add Transaction"
            isRound
            icon={<AddIcon />}
            size="xs"
            colorScheme="blue"
            onClick={() => {
              setTxs((prev) => [...prev, ""]);
            }}
          />
        </Flex>
        <Flex flexDir="column" mt={2} pl={4}>
          {txs.map((value, i) => (
            <Box key={i}>
              <Text fontWeight="bold" mb={2}>
                Transaction {i + 1}
              </Text>
              <Flex my="5px" alignItems="center">
                <EvmTxForm
                  key={i}
                  setTransactionObject={(tx) => {
                    setTxs((prev) => {
                      const newTxs = [...prev];
                      newTxs[i] = tx;
                      return newTxs;
                    });
                  }}
                  account={account}
                />
              </Flex>
            </Box>
          ))}
        </Flex>
      </Grid>
    </>
  );
};

export default EvmBatchTxEditor;
