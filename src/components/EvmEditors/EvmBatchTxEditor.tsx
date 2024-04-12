import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import {
  Box,
  Text,
  Grid,
  Flex,
  IconButton,
  Radio,
  RadioGroup,
  Button,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import type { EthereumTypes } from "@blocto/sdk";
import EvmTxForm from "./EvmTxForm";
import { web3 } from "../../services/evm";
import erc721Abi from "../../contracts/abi/ERC721.json";

interface EvmBatchTxEditorProps {
  setRequestObject: Dispatch<
    SetStateAction<EthereumTypes.EIP1193RequestPayload | undefined>
  >;
  account: string | null;
  chainId: string | null;
}

const RevertOptionMap: Record<string, any> = {
  false: false,
  true: true,
  unset: undefined,
};

const EvmBatchTxEditor = ({
  setRequestObject,
  account,
  chainId,
}: EvmBatchTxEditorProps): ReactJSXElement => {
  const [revert, setRevert] = useState<string>("false");
  const [txs, setTxs] = useState<any[]>();

  useEffect(() => {
    if (account) {
      setRequestObject({
        method: "wallet_sendMultiCallTransaction",
        params: [
          txs,
          ...(RevertOptionMap[revert] !== undefined
            ? [RevertOptionMap[revert]]
            : []),
        ],
      });
    }
  }, [account, setRequestObject, revert, txs]);

  const addTransfer = () => {
    const obj = {
      value: "0x1",
      to: "0x85fD692D2a075908079261F5E351e7fE0267dB02",
      from: account,
    };
    setTxs((state) => {
      return [...(state || []), obj];
    });
  };

  const mintNFT = () => {
    // TODO: wait backend provide all evm chain contract address
    const contractAddr = "0x6bDa27BB78833658D19049118b73eC7b07815C8A"; // only scroll testnet
    const contract = new web3.eth.Contract(erc721Abi as any, contractAddr);
    const obj = {
      from: account,
      to: contractAddr,
      data: contract.methods.mint(account).encodeABI(),
    };
    setTxs((state) => {
      return [...(state || []), obj];
    });
  };

  const SwapToken = () => {
    const obj = {
      from: account,
      to: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
      data: "0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000066053af000000000000000000000000000000000000000000000000000000000000000020b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000038d7ea4c680000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000038d7ea4c680000000000000000000000000000000000000000000000000000000b99e289c676500000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002bfff9976782d46cc05630d1f6ebab18b2324d6b140001f41f9840a85d5af5bf1d1762f925bdaddc4201f984000000000000000000000000000000000000000000",
    };
    setTxs((state) => {
      return [...(state || []), obj];
    });
  };

  const removeTransfer = (index: number) => {
    setTxs((state) => {
      if (Array.isArray(state) && state.length === 1) {
        return [];
      }
      const newParam = [...(state || [])];
      return newParam.splice(index, 1);
    });
  };
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
            {Object.keys(RevertOptionMap).map((key) => (
              <Radio key={key} value={key}>
                {key}
              </Radio>
            ))}
          </Flex>
        </RadioGroup>

        <Grid
          alignItems="center"
          gap="10px"
          gridAutoFlow="column"
          justifyContent="left"
        >
          <Box fontWeight="bold">Transaction</Box>
          <Button w="110px" onClick={addTransfer}>
            Transfer
          </Button>
          <Button w="110px" onClick={mintNFT}>
            Mint NFT
          </Button>
          {chainId === "0xaa36a7" && (
            <Button w="110px" onClick={SwapToken}>
              Swap
            </Button>
          )}
        </Grid>
        <Flex flexDir="column" mt={2} pl={4}>
          {Array.isArray(txs) &&
            txs?.length > 0 &&
            txs?.map((value, i: number) => (
              <Box key={i}>
                <Flex alignItems="center">
                  <Text fontWeight="bold" mb={2}>
                    Transaction {i + 1}
                  </Text>
                  <IconButton
                    ml={2}
                    aria-label="Delete Arg"
                    isRound
                    icon={<CloseIcon />}
                    size="xs"
                    colorScheme="red"
                    onClick={() => removeTransfer(i)}
                  />
                </Flex>
                <Flex my="5px" alignItems="center">
                  <EvmTxForm
                    key={i}
                    setTransactionObject={(updatedTxs) => {
                      if (updatedTxs)
                        setTxs((prev) => {
                          const newTxs = [...(prev || [])];
                          newTxs[i] = updatedTxs[0];
                          return newTxs;
                        });
                    }}
                    isCustom={true}
                    account={account}
                    customParams={value}
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
