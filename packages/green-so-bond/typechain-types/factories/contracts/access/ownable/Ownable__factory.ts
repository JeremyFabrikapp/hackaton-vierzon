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
import type { NonPayableOverrides } from "../../../../common";
import type {
  Ownable,
  OwnableInterface,
} from "../../../../contracts/access/ownable/Ownable";

const _abi = [
  {
    inputs: [],
    name: "Ownable__NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "Ownable__NotTransitiveOwner",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b5061045b8061001f6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063715018a6146100465780638da5cb5b14610050578063f2fde38b1461006e575b600080fd5b61004e61008a565b005b610058610112565b604051610065919061032f565b60405180910390f35b6100886004803603810190610083919061037b565b610121565b005b6100926101a9565b73ffffffffffffffffffffffffffffffffffffffff166100b06101dc565b73ffffffffffffffffffffffffffffffffffffffff1614610106576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100fd90610405565b60405180910390fd5b61011060006101e4565b565b600061011c6101a9565b905090565b6101296101a9565b73ffffffffffffffffffffffffffffffffffffffff166101476101dc565b73ffffffffffffffffffffffffffffffffffffffff161461019d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161019490610405565b60405180910390fd5b6101a6816101e4565b50565b60006101b36101f0565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600033905090565b6101ed8161021d565b50565b6000807fc0ea367cb0174dd5521cd2372c76f8c13e6c1f832c71f1d6e0cbc185c9cc8ed490508091505090565b60006102276101f0565b90508173ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3818160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610319826102ee565b9050919050565b6103298161030e565b82525050565b60006020820190506103446000830184610320565b92915050565b600080fd5b6103588161030e565b811461036357600080fd5b50565b6000813590506103758161034f565b92915050565b6000602082840312156103915761039061034a565b5b600061039f84828501610366565b91505092915050565b600082825260208201905092915050565b7f4552433137333a2073656e646572206d757374206265206f776e657200000000600082015250565b60006103ef601c836103a8565b91506103fa826103b9565b602082019050919050565b6000602082019050818103600083015261041e816103e2565b905091905056fea2646970667358221220794aade590ccc9fe16226b2471eeb2fc8c1d32494315774c9c8807c2661fc50364736f6c634300081b0033";

type OwnableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OwnableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Ownable__factory extends ContractFactory {
  constructor(...args: OwnableConstructorParams) {
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
      Ownable & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Ownable__factory {
    return super.connect(runner) as Ownable__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OwnableInterface {
    return new Interface(_abi) as OwnableInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Ownable {
    return new Contract(address, _abi, runner) as unknown as Ownable;
  }
}
