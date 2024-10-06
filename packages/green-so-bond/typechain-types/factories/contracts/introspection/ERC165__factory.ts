/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  ERC165,
  ERC165Interface,
} from "../../../contracts/introspection/ERC165";

const _abi = [
  {
    inputs: [],
    name: "ERC165Base__InvalidInterfaceId",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b506102068061001f6000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806301ffc9a714610030575b600080fd5b61004a6004803603810190610045919061016d565b610060565b60405161005791906101b5565b60405180910390f35b600061006b82610072565b9050919050565b600061007c6100e3565b6000016000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff169050919050565b6000807fff923f4a67695a9cdd5da4b8580a5a20edf2183c42aa111dd7fc15dc7bed264090508091505090565b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61014a81610115565b811461015557600080fd5b50565b60008135905061016781610141565b92915050565b60006020828403121561018357610182610110565b5b600061019184828501610158565b91505092915050565b60008115159050919050565b6101af8161019a565b82525050565b60006020820190506101ca60008301846101a6565b9291505056fea2646970667358221220a5afcd4f298bb6ce3c2f0138c1d9ab59d4733e4b60d63bcacfbe00e697662eba64736f6c634300081b0033";

type ERC165ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC165ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC165__factory extends ContractFactory {
  constructor(...args: ERC165ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      ERC165 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC165__factory {
    return super.connect(runner) as ERC165__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC165Interface {
    return new Interface(_abi) as ERC165Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): ERC165 {
    return new Contract(address, _abi, runner) as unknown as ERC165;
  }
}
