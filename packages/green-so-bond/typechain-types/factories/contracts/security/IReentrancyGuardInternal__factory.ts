/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IReentrancyGuardInternal,
  IReentrancyGuardInternalInterface,
} from "../../../contracts/security/IReentrancyGuardInternal";

const _abi = [
  {
    inputs: [],
    name: "ReentrancyGuard__ReentrantCall",
    type: "error",
  },
] as const;

export class IReentrancyGuardInternal__factory {
  static readonly abi = _abi;
  static createInterface(): IReentrancyGuardInternalInterface {
    return new Interface(_abi) as IReentrancyGuardInternalInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IReentrancyGuardInternal {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as IReentrancyGuardInternal;
  }
}
