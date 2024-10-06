/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface MathMockInterface extends Interface {
  getFunction(
    nameOrSignature: "abs" | "average" | "max" | "min" | "sqrt"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "abs", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "average",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "max",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "min",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "sqrt", values: [BigNumberish]): string;

  decodeFunctionResult(functionFragment: "abs", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "average", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "max", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "min", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sqrt", data: BytesLike): Result;
}

export interface MathMock extends BaseContract {
  connect(runner?: ContractRunner | null): MathMock;
  waitForDeployment(): Promise<this>;

  interface: MathMockInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  abs: TypedContractMethod<[a: BigNumberish], [bigint], "view">;

  average: TypedContractMethod<
    [a: BigNumberish, b: BigNumberish],
    [bigint],
    "view"
  >;

  max: TypedContractMethod<
    [a: BigNumberish, b: BigNumberish],
    [bigint],
    "view"
  >;

  min: TypedContractMethod<
    [a: BigNumberish, b: BigNumberish],
    [bigint],
    "view"
  >;

  sqrt: TypedContractMethod<[x: BigNumberish], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "abs"
  ): TypedContractMethod<[a: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "average"
  ): TypedContractMethod<[a: BigNumberish, b: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "max"
  ): TypedContractMethod<[a: BigNumberish, b: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "min"
  ): TypedContractMethod<[a: BigNumberish, b: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "sqrt"
  ): TypedContractMethod<[x: BigNumberish], [bigint], "view">;

  filters: {};
}
