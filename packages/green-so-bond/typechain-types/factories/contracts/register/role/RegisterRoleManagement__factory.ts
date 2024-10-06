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
  RegisterRoleManagement,
  RegisterRoleManagementInterface,
} from "../../../../contracts/register/role/RegisterRoleManagement";

const _abi = [
  {
    inputs: [],
    name: "EnumerableSet__IndexOutOfBounds",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_addressForNewAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "BND_ROLE",
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
    name: "CAK_ROLE",
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
    name: "CST_ROLE",
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
    name: "PAY_ROLE",
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
    name: "addressForNewAdmin",
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
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "changeAdminRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "firstVoterForNewAdmin",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
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
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
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
        internalType: "address",
        name: "bndAddress_",
        type: "address",
      },
    ],
    name: "grantBndRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cakAddress_",
        type: "address",
      },
    ],
    name: "grantCakRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cstAddress_",
        type: "address",
      },
    ],
    name: "grantCstRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "payAddress_",
        type: "address",
      },
    ],
    name: "grantPayRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isBnD",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isCAK",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isCustodian",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isPay",
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
    inputs: [],
    name: "registerAdmin",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "bndAddress_",
        type: "address",
      },
    ],
    name: "revokeBndRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cakAddress_",
        type: "address",
      },
    ],
    name: "revokeCakRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cstAddress_",
        type: "address",
      },
    ],
    name: "revokeCstRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "payAddress_",
        type: "address",
      },
    ],
    name: "revokePayRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "votesForNewAdmin",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b5061212d8061001f6000396000f3fe608060405234801561001057600080fd5b50600436106101c35760003560e01c80638e1305de116100f9578063c1f4250b11610097578063d547741f11610071578063d547741f14610504578063e3965d5414610520578063f60d9ea114610550578063f690c6c51461056c576101c3565b8063c1f4250b1461049c578063ca15c873146104b8578063cc80473c146104e8576101c3565b8063a28f78f8116100d3578063a28f78f814610414578063a55234b814610430578063a5ce247214610460578063aa39403d1461047e576101c3565b80638e1305de146103985780639010d07c146103b457806391d14854146103e4576101c3565b80632f2ff15d116101665780634361f92a116101405780634361f92a146103105780635ab6f71b146103405780638865f1e21461035e5780638bb9c5bf1461037c576101c3565b80632f2ff15d146102a657806335c80c8c146102c25780633bf2a9f4146102f2576101c3565b80631c67a363116101a25780631c67a3631461021e578063222ca3401461023c578063248a9ca3146102585780632682ac9114610288576101c3565b8062a9303d146101c857806304b8c471146101e457806306cb375014610200575b600080fd5b6101e260048036038101906101dd91906119a7565b610588565b005b6101fe60048036038101906101f991906119a7565b610594565b005b6102086105a0565b60405161021591906119e3565b60405180910390f35b6102266105af565b6040516102339190611a17565b60405180910390f35b610256600480360381019061025191906119a7565b6105d3565b005b610272600480360381019061026d9190611a5e565b6105df565b60405161027f9190611a17565b60405180910390f35b6102906105f1565b60405161029d9190611a17565b60405180910390f35b6102c060048036038101906102bb9190611a8b565b610615565b005b6102dc60048036038101906102d791906119a7565b610623565b6040516102e99190611ae6565b60405180910390f35b6102fa610635565b6040516103079190611a17565b60405180910390f35b61032a600480360381019061032591906119a7565b610659565b6040516103379190611ae6565b60405180910390f35b61034861066b565b60405161035591906119e3565b60405180910390f35b61036661067a565b6040516103739190611a17565b60405180910390f35b61039660048036038101906103919190611a5e565b61069e565b005b6103b260048036038101906103ad91906119a7565b6106aa565b005b6103ce60048036038101906103c99190611b37565b6106b6565b6040516103db91906119e3565b60405180910390f35b6103fe60048036038101906103f99190611a8b565b6106ca565b60405161040b9190611ae6565b60405180910390f35b61042e600480360381019061042991906119a7565b6106de565b005b61044a600480360381019061044591906119a7565b6106ea565b6040516104579190611ae6565b60405180910390f35b6104686106fc565b60405161047591906119e3565b60405180910390f35b61048661070b565b6040516104939190611b93565b60405180910390f35b6104b660048036038101906104b191906119a7565b61071a565b005b6104d260048036038101906104cd9190611a5e565b610726565b6040516104df9190611bbd565b60405180910390f35b61050260048036038101906104fd91906119a7565b610738565b005b61051e60048036038101906105199190611a8b565b610744565b005b61053a600480360381019061053591906119a7565b610752565b6040516105479190611ae6565b60405180910390f35b61056a600480360381019061056591906119a7565b610764565b005b610586600480360381019061058191906119a7565b610770565b005b6105918161077c565b50565b61059d816107a9565b50565b60006105aa610e73565b905090565b7f6ba6f588bcdc2df8426603a466c98ab15e79f7fb7f37b53581ce39c1d01b724981565b6105dc81610eab565b50565b60006105ea82610ed8565b9050919050565b7ff698af62c65280e4949bceec64b760f3b7738217cbc536cdfc4c9463676b05c281565b61061f8282610f01565b5050565b600061062e82611088565b9050919050565b7fd7aa2ddfa4e381128202bf365b7e0a176f2fca6cdf2f23c2b0a6f4393769589081565b6000610664826110bb565b9050919050565b60006106756110ee565b905090565b7fa75205b8583660bdad375c0ccde11af17668d76a408a9a5e739251b0f7c5987081565b6106a781611126565b50565b6106b38161113a565b50565b60006106c28383611167565b905092915050565b60006106d683836111a2565b905092915050565b6106e7816111dd565b50565b60006106f58261120a565b9050919050565b600061070661123d565b905090565b6000610715611275565b905090565b6107238161129a565b50565b6000610731826112c7565b9050919050565b610741816112f7565b50565b61074e8282611324565b5050565b600061075d8261146e565b9050919050565b61076d816114a1565b50565b610779816114ce565b50565b6107a67fd7aa2ddfa4e381128202bf365b7e0a176f2fca6cdf2f23c2b0a6f4393769589082610f01565b50565b60006107b36114fb565b90506107e67fa75205b8583660bdad375c0ccde11af17668d76a408a9a5e739251b0f7c598706107e1611528565b6111a2565b610825576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161081c90611c35565b60405180910390fd5b8060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036108b7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108ae90611cc7565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16148015610907575060018160020160149054906101000a900460ff1660ff16145b156109b75760008160020160146101000a81548160ff021916908360ff16021790555060008160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550818160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610e70565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610a26576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a1d90611d59565b60405180910390fd5b60008160020160149054906101000a900460ff1660ff1603610af35760018160020160146101000a81548160ff021916908360ff160217905550610a68611528565b8160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550818160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610e70565b60018160020160149054906101000a900460ff1660ff1603610e6e578060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614610bf957610b6e611528565b8160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550818160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610e70565b610c01611528565b73ffffffffffffffffffffffffffffffffffffffff168160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610c92576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c8990611dc5565b60405180910390fd5b610cc36000801b8260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611530565b610cf46000801b8260010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166115c8565b8060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008160020160146101000a81548160ff021916908360ff16021790555060008160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7ce7ec0b50378fb6c0186ffb5f48325f6593fcb4ca4386f21861af3129188f5c60405160405180910390a250610e70565b505b50565b600080610e7e6114fb565b90508060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b610ed57f6ba6f588bcdc2df8426603a466c98ab15e79f7fb7f37b53581ce39c1d01b724982611324565b50565b6000610ee26115d6565b6000016000838152602001908152602001600020600201549050919050565b6000801b8203610f51576000610f4c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f4390611e57565b60405180910390fd5b61107a565b7fa75205b8583660bdad375c0ccde11af17668d76a408a9a5e739251b0f7c59870820361100857610fa97fa75205b8583660bdad375c0ccde11af17668d76a408a9a5e739251b0f7c59870610fa4611528565b6111a2565b80610fc45750610fc36000801b610fbe611528565b6111a2565b5b611003576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ffa90611ee9565b60405180910390fd5b611079565b6110397fa75205b8583660bdad375c0ccde11af17668d76a408a9a5e739251b0f7c59870611034611528565b6111a2565b611078576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161106f90611f55565b60405180910390fd5b5b5b6110848282611603565b5050565b60006110b47f6ba6f588bcdc2df8426603a466c98ab15e79f7fb7f37b53581ce39c1d01b7249836111a2565b9050919050565b60006110e77fa75205b8583660bdad375c0ccde11af17668d76a408a9a5e739251b0f7c59870836111a2565b9050919050565b6000806110f96114fb565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b61113781611132611528565b611324565b50565b6111647fa75205b8583660bdad375c0ccde11af17668d76a408a9a5e739251b0f7c5987082611324565b50565b600061119a826111756115d6565b600001600086815260200190815260200160002060000161169b90919063ffffffff16565b905092915050565b60006111d5826111b06115d6565b60000160008681526020019081526020016000206000016116b590919063ffffffff16565b905092915050565b6112077fa75205b8583660bdad375c0ccde11af17668d76a408a9a5e739251b0f7c5987082610f01565b50565b60006112367ff698af62c65280e4949bceec64b760f3b7738217cbc536cdfc4c9463676b05c2836111a2565b9050919050565b6000806112486114fb565b90508060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b6000806112806114fb565b90508060020160149054906101000a900460ff1691505090565b6112c47ff698af62c65280e4949bceec64b760f3b7738217cbc536cdfc4c9463676b05c282611324565b50565b60006112f06112d46115d6565b60000160008481526020019081526020016000206000016116e5565b9050919050565b6113217ff698af62c65280e4949bceec64b760f3b7738217cbc536cdfc4c9463676b05c282610f01565b50565b6000801b820361137057600061136f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161136690611e57565b60405180910390fd5b5b7fa75205b8583660bdad375c0ccde11af17668d76a408a9a5e739251b0f7c5987082036113ef576113ab6000801b6113a6611528565b6111a2565b6113ea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113e190611fe7565b60405180910390fd5b611460565b6114207fa75205b8583660bdad375c0ccde11af17668d76a408a9a5e739251b0f7c5987061141b611528565b6111a2565b61145f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161145690612079565b60405180910390fd5b5b61146a8282611530565b5050565b600061149a7fd7aa2ddfa4e381128202bf365b7e0a176f2fca6cdf2f23c2b0a6f43937695890836111a2565b9050919050565b6114cb7fd7aa2ddfa4e381128202bf365b7e0a176f2fca6cdf2f23c2b0a6f4393769589082611324565b50565b6114f87f6ba6f588bcdc2df8426603a466c98ab15e79f7fb7f37b53581ce39c1d01b724982610f01565b50565b6000807fe40b5d020f846aaa1a692b46598f2e6c6d0a32cf717c27c286e348cc2a7d304e90508091505090565b600033905090565b6115618161153c6115d6565b60000160008581526020019081526020016000206000016116fa90919063ffffffff16565b5061156a611528565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6115d28282610f01565b5050565b6000807f2e59e4c2e927cdddbb64e181e0668d9a0fa70dd88f94d999cd87d5496a20da6290508091505090565b6116348161160f6115d6565b600001600085815260200190815260200160002060000161172a90919063ffffffff16565b5061163d611528565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60006116aa836000018361175a565b60001c905092915050565b60006116dd836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6117c5565b905092915050565b60006116f3826000016117e8565b9050919050565b6000611722836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6117f9565b905092915050565b6000611752836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6118dd565b905092915050565b60008260000180549050821061179c576040517fe637bf3b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8260000182815481106117b2576117b1612099565b5b9060005260206000200154905092915050565b600080836001016000848152602001908152602001600020541415905092915050565b600081600001805490509050919050565b600080836001016000848152602001908152602001600020549050600081146118d65760008460000160018660000180549050038154811061183e5761183d612099565b5b906000526020600020015490508085600001600184038154811061186557611864612099565b5b9060005260206000200181905550818560010160008381526020019081526020016000208190555050836000018054806118a2576118a16120c8565b5b6001900381819060005260206000200160009055905583600101600084815260200190815260200160002060009055600191505b5092915050565b60006118e983836117c5565b61193e5782600001829080600181540180825580915050600190039060005260206000200160009091909190915055826000018054905083600101600084815260200190815260200160002081905550600190505b92915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061197482611949565b9050919050565b61198481611969565b811461198f57600080fd5b50565b6000813590506119a18161197b565b92915050565b6000602082840312156119bd576119bc611944565b5b60006119cb84828501611992565b91505092915050565b6119dd81611969565b82525050565b60006020820190506119f860008301846119d4565b92915050565b6000819050919050565b611a11816119fe565b82525050565b6000602082019050611a2c6000830184611a08565b92915050565b611a3b816119fe565b8114611a4657600080fd5b50565b600081359050611a5881611a32565b92915050565b600060208284031215611a7457611a73611944565b5b6000611a8284828501611a49565b91505092915050565b60008060408385031215611aa257611aa1611944565b5b6000611ab085828601611a49565b9250506020611ac185828601611992565b9150509250929050565b60008115159050919050565b611ae081611acb565b82525050565b6000602082019050611afb6000830184611ad7565b92915050565b6000819050919050565b611b1481611b01565b8114611b1f57600080fd5b50565b600081359050611b3181611b0b565b92915050565b60008060408385031215611b4e57611b4d611944565b5b6000611b5c85828601611a49565b9250506020611b6d85828601611b22565b9150509250929050565b600060ff82169050919050565b611b8d81611b77565b82525050565b6000602082019050611ba86000830184611b84565b92915050565b611bb781611b01565b82525050565b6000602082019050611bd26000830184611bae565b92915050565b600082825260208201905092915050565b7f43616c6c6572206d7573742062652043414b0000000000000000000000000000600082015250565b6000611c1f601283611bd8565b9150611c2a82611be9565b602082019050919050565b60006020820190508181036000830152611c4e81611c12565b9050919050565b7f4e65772061646d696e206973207468652073616d652061732063757272656e7460008201527f206f6e6500000000000000000000000000000000000000000000000000000000602082015250565b6000611cb1602483611bd8565b9150611cbc82611c55565b604082019050919050565b60006020820190508181036000830152611ce081611ca4565b9050919050565b7f5468652070726f706f736564206e65772061646d696e2063616e6e6f7420626560008201527f20746865207a65726f2061646472657373000000000000000000000000000000602082015250565b6000611d43603183611bd8565b9150611d4e82611ce7565b604082019050919050565b60006020820190508181036000830152611d7281611d36565b9050919050565b7f546869732043414b2068617320616c726561647920766f746564000000000000600082015250565b6000611daf601a83611bd8565b9150611dba82611d79565b602082019050919050565b60006020820190508181036000830152611dde81611da2565b9050919050565b7f5573652066756e6374696f6e206368616e676541646d696e526f6c6520696e7360008201527f7465616400000000000000000000000000000000000000000000000000000000602082015250565b6000611e41602483611bd8565b9150611e4c82611de5565b604082019050919050565b60006020820190508181036000830152611e7081611e34565b9050919050565b7f43616c6c6572206d7573742062652043414b206f722041444d494e20746f207360008201527f657420616e6f746865722043414b000000000000000000000000000000000000602082015250565b6000611ed3602e83611bd8565b9150611ede82611e77565b604082019050919050565b60006020820190508181036000830152611f0281611ec6565b9050919050565b7f43616c6c6572206d7573742062652043414b20746f20736574206120726f6c65600082015250565b6000611f3f602083611bd8565b9150611f4a82611f09565b602082019050919050565b60006020820190508181036000830152611f6e81611f32565b9050919050565b7f43616c6c6572206d7573742062652041444d494e20746f2072656d6f7665206160008201527f2043414b00000000000000000000000000000000000000000000000000000000602082015250565b6000611fd1602483611bd8565b9150611fdc82611f75565b604082019050919050565b6000602082019050818103600083015261200081611fc4565b9050919050565b7f43616c6c6572206d7573742062652043414b20746f2072656d6f76652061207260008201527f6f6c650000000000000000000000000000000000000000000000000000000000602082015250565b6000612063602383611bd8565b915061206e82612007565b604082019050919050565b6000602082019050818103600083015261209281612056565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea2646970667358221220c96f5b075056b923822ceff7df1293a21b7c7488c9cd79f892164bbbedc62df764736f6c634300081b0033";

type RegisterRoleManagementConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RegisterRoleManagementConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RegisterRoleManagement__factory extends ContractFactory {
  constructor(...args: RegisterRoleManagementConstructorParams) {
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
      RegisterRoleManagement & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): RegisterRoleManagement__factory {
    return super.connect(runner) as RegisterRoleManagement__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RegisterRoleManagementInterface {
    return new Interface(_abi) as RegisterRoleManagementInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): RegisterRoleManagement {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as RegisterRoleManagement;
  }
}
