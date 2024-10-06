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
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export declare namespace ITrade {
  export type TradeDetailStruct = {
    quantity: BigNumberish;
    buyer: AddressLike;
    tradeDate: BigNumberish;
    valueDate: BigNumberish;
    price: BigNumberish;
  };

  export type TradeDetailStructOutput = [
    quantity: bigint,
    buyer: string,
    tradeDate: bigint,
    valueDate: bigint,
    price: bigint
  ] & {
    quantity: bigint;
    buyer: string;
    tradeDate: bigint;
    valueDate: bigint;
    price: bigint;
  };
}

export interface ITradeInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "buyerAccount"
      | "getDetails"
      | "paymentID"
      | "register"
      | "sellerAccount"
      | "status"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "NotifyTrade"): EventFragment;

  encodeFunctionData(
    functionFragment: "buyerAccount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getDetails",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "paymentID", values?: undefined): string;
  encodeFunctionData(functionFragment: "register", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "sellerAccount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "status", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "buyerAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getDetails", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paymentID", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sellerAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "status", data: BytesLike): Result;
}

export namespace NotifyTradeEvent {
  export type InputTuple = [
    seller: AddressLike,
    buyer: AddressLike,
    status: BigNumberish,
    quantity: BigNumberish
  ];
  export type OutputTuple = [
    seller: string,
    buyer: string,
    status: bigint,
    quantity: bigint
  ];
  export interface OutputObject {
    seller: string;
    buyer: string;
    status: bigint;
    quantity: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ITrade extends BaseContract {
  connect(runner?: ContractRunner | null): ITrade;
  waitForDeployment(): Promise<this>;

  interface: ITradeInterface;

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

  buyerAccount: TypedContractMethod<[], [string], "view">;

  getDetails: TypedContractMethod<[], [ITrade.TradeDetailStructOutput], "view">;

  paymentID: TypedContractMethod<[], [string], "view">;

  register: TypedContractMethod<[], [string], "view">;

  sellerAccount: TypedContractMethod<[], [string], "view">;

  status: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "buyerAccount"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getDetails"
  ): TypedContractMethod<[], [ITrade.TradeDetailStructOutput], "view">;
  getFunction(
    nameOrSignature: "paymentID"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "register"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "sellerAccount"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "status"
  ): TypedContractMethod<[], [bigint], "view">;

  getEvent(
    key: "NotifyTrade"
  ): TypedContractEvent<
    NotifyTradeEvent.InputTuple,
    NotifyTradeEvent.OutputTuple,
    NotifyTradeEvent.OutputObject
  >;

  filters: {
    "NotifyTrade(address,address,uint8,uint256)": TypedContractEvent<
      NotifyTradeEvent.InputTuple,
      NotifyTradeEvent.OutputTuple,
      NotifyTradeEvent.OutputObject
    >;
    NotifyTrade: TypedContractEvent<
      NotifyTradeEvent.InputTuple,
      NotifyTradeEvent.OutputTuple,
      NotifyTradeEvent.OutputObject
    >;
  };
}
