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
  BinaryHeapBytes32Mock,
  BinaryHeapBytes32MockInterface,
} from "../../../contracts/data/BinaryHeapBytes32Mock";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "value",
        type: "bytes32",
      },
    ],
    name: "add",
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
        name: "index",
        type: "uint256",
      },
    ],
    name: "at",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "value",
        type: "bytes32",
      },
    ],
    name: "contains",
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
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "value",
        type: "bytes32",
      },
    ],
    name: "indexOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "length",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "value",
        type: "bytes32",
      },
    ],
    name: "remove",
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
    inputs: [],
    name: "root",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "toArray",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b50610a588061001f6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063908ff3031161005b578063908ff3031461013b57806395bc267314610159578063e0886f9014610189578063ebf0c717146101b957610088565b80631d1a696d1461008d5780631f7b6d32146100bd578063446bffba146100db5780636f4ce56a1461010b575b600080fd5b6100a760048036038101906100a2919061079b565b6101d7565b6040516100b491906107e3565b60405180910390f35b6100c56101f4565b6040516100d29190610817565b60405180910390f35b6100f560048036038101906100f0919061079b565b610205565b60405161010291906107e3565b60405180910390f35b6101256004803603810190610120919061079b565b610222565b6040516101329190610817565b60405180910390f35b61014361023f565b60405161015091906108f0565b60405180910390f35b610173600480360381019061016e919061079b565b610250565b60405161018091906107e3565b60405180910390f35b6101a3600480360381019061019e919061093e565b61026d565b6040516101b0919061097a565b60405180910390f35b6101c161028a565b6040516101ce919061097a565b60405180910390f35b60006101ed82600061029b90919063ffffffff16565b9050919050565b600061020060006102b2565b905090565b600061021b8260006102c790919063ffffffff16565b9050919050565b60006102388260006102de90919063ffffffff16565b9050919050565b606061024b60006102f5565b905090565b600061026682600061035490919063ffffffff16565b9050919050565b600061028382600061036b90919063ffffffff16565b9050919050565b60006102966000610382565b905090565b60006102aa8360000183610397565b905092915050565b60006102c0826000016103ba565b9050919050565b60006102d683600001836103cb565b905092915050565b60006102ed836000018361043c565b905092915050565b60608160000160000180548060200260200160405190810160405280929190818152602001828054801561034857602002820191906000526020600020905b815481526020019060010190808311610334575b50505050509050919050565b6000610363836000018361045f565b905092915050565b600061037a83600001836104ec565b905092915050565b600061039082600001610517565b9050919050565b600080836001016000848152602001908152602001600020541415905092915050565b600081600001805490509050919050565b60006103d78383610397565b610436578260000182908060018154018082558091505060019003906000526020600020016000909190919091505561040f836103ba565b836001016000848152602001908152602001600020819055506104318361052b565b600190505b92915050565b600060018360010160008481526020019081526020016000205403905092915050565b600061046b8383610397565b156104e657600061047c848461043c565b90506104948482600161048e886103ba565b03610574565b836000018054806104a8576104a7610995565b5b60019003818190600052602060002001600090559055836001016000848152602001908152602001600020600090556104e08461052b565b60019150505b92915050565b6000826000018281548110610504576105036109c4565b5b9060005260206000200154905092915050565b60006105248260006104ec565b9050919050565b6000610536826103ba565b905060006002828161054b5761054a6109f3565b5b0490505b600081111561056f5761056a83838360019003935083610677565b61054f565b505050565b60008360000190506000818481548110610591576105906109c4565b5b9060005260206000200154905060008284815481106105b3576105b26109c4565b5b9060005260206000200154905080828487815481106105d5576105d46109c4565b5b9060005260206000200160008688815481106105f4576105f36109c4565b5b906000526020600020016000849190505583919050555050600086600101905080600083815260200190815260200160002054816000858152602001908152602001600020548260008681526020019081526020016000206000846000878152602001908152602001600020600084919050558391905055505050505050505050565b60008190506000846000019050600060018085901b179050600060018201905085821080156106df57508282815481106106b4576106b36109c4565b5b90600052602060002001548385815481106106d2576106d16109c4565b5b9060005260206000200154105b156106e8578193505b85811080156107305750828181548110610705576107046109c4565b5b9060005260206000200154838581548110610723576107226109c4565b5b9060005260206000200154105b15610739578093505b50508282146107595761074d858484610574565b610758858584610677565b5b5050505050565b600080fd5b6000819050919050565b61077881610765565b811461078357600080fd5b50565b6000813590506107958161076f565b92915050565b6000602082840312156107b1576107b0610760565b5b60006107bf84828501610786565b91505092915050565b60008115159050919050565b6107dd816107c8565b82525050565b60006020820190506107f860008301846107d4565b92915050565b6000819050919050565b610811816107fe565b82525050565b600060208201905061082c6000830184610808565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61086781610765565b82525050565b6000610879838361085e565b60208301905092915050565b6000602082019050919050565b600061089d82610832565b6108a7818561083d565b93506108b28361084e565b8060005b838110156108e35781516108ca888261086d565b97506108d583610885565b9250506001810190506108b6565b5085935050505092915050565b6000602082019050818103600083015261090a8184610892565b905092915050565b61091b816107fe565b811461092657600080fd5b50565b60008135905061093881610912565b92915050565b60006020828403121561095457610953610760565b5b600061096284828501610929565b91505092915050565b61097481610765565b82525050565b600060208201905061098f600083018461096b565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fdfea26469706673582212205eb5940b28b0f909dd030118a711ac9d83de2fc64c268e4cb5edd296824e837e64736f6c634300081b0033";

type BinaryHeapBytes32MockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BinaryHeapBytes32MockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BinaryHeapBytes32Mock__factory extends ContractFactory {
  constructor(...args: BinaryHeapBytes32MockConstructorParams) {
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
      BinaryHeapBytes32Mock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): BinaryHeapBytes32Mock__factory {
    return super.connect(runner) as BinaryHeapBytes32Mock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BinaryHeapBytes32MockInterface {
    return new Interface(_abi) as BinaryHeapBytes32MockInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): BinaryHeapBytes32Mock {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as BinaryHeapBytes32Mock;
  }
}
