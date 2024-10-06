/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ISoCashInterBank,
  ISoCashInterBankInterface,
} from "../../../../src/intf/so-cash-bank.sol/ISoCashInterBank";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISoCashBank",
        name: "target",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract ISoCashAccount",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum OperationDirection",
        name: "direction",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "TransferId",
        name: "id",
        type: "uint256",
      },
    ],
    name: "Adviced",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "enum OperationDirection",
        name: "direction",
        type: "uint8",
      },
      {
        internalType: "TransferId",
        name: "id",
        type: "uint256",
      },
    ],
    name: "advice",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "TransferId",
        name: "id",
        type: "uint256",
      },
    ],
    name: "interbankNetting",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract ISoCashAccount",
            name: "account",
            type: "address",
          },
          {
            internalType: "BIC",
            name: "bic",
            type: "bytes11",
          },
          {
            internalType: "IBAN",
            name: "iban",
            type: "bytes32",
          },
        ],
        internalType: "struct RecipentInfo",
        name: "to",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "TransferId",
        name: "id",
        type: "uint256",
      },
    ],
    name: "interbankTransfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ISoCashInterBank__factory {
  static readonly abi = _abi;
  static createInterface(): ISoCashInterBankInterface {
    return new Interface(_abi) as ISoCashInterBankInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ISoCashInterBank {
    return new Contract(address, _abi, runner) as unknown as ISoCashInterBank;
  }
}
