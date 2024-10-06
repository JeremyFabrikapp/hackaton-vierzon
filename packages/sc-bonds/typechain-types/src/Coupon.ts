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
} from "../common";

export interface CouponInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "couponDate"
      | "cutOfTime"
      | "getInvestorPayments"
      | "getPaymentAmountForInvestor"
      | "getTotalPaymentAmount"
      | "investorPayments"
      | "nbDays"
      | "payingAgent"
      | "paymentIdForInvest"
      | "recordDate"
      | "register"
      | "rejectCoupon"
      | "setCutOffTime"
      | "setDateAsCurrentCoupon"
      | "setNbDays"
      | "status"
      | "toggleCouponPayment"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "CouponChanged" | "CouponPaymentStatusChanged"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "couponDate",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "cutOfTime", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getInvestorPayments",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getPaymentAmountForInvestor",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalPaymentAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "investorPayments",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "nbDays", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "payingAgent",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "paymentIdForInvest",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "recordDate",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "register", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "rejectCoupon",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setCutOffTime",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setDateAsCurrentCoupon",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setNbDays",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "status", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "toggleCouponPayment",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "couponDate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "cutOfTime", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getInvestorPayments",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPaymentAmountForInvestor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalPaymentAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "investorPayments",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nbDays", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "payingAgent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "paymentIdForInvest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "recordDate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rejectCoupon",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setCutOffTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDateAsCurrentCoupon",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setNbDays", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "status", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "toggleCouponPayment",
    data: BytesLike
  ): Result;
}

export namespace CouponChangedEvent {
  export type InputTuple = [
    register: AddressLike,
    couponDate: BigNumberish,
    status: BigNumberish
  ];
  export type OutputTuple = [
    register: string,
    couponDate: bigint,
    status: bigint
  ];
  export interface OutputObject {
    register: string;
    couponDate: bigint;
    status: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CouponPaymentStatusChangedEvent {
  export type InputTuple = [
    register: AddressLike,
    couponDate: BigNumberish,
    investor: AddressLike,
    status: BigNumberish,
    previousStatus: BigNumberish
  ];
  export type OutputTuple = [
    register: string,
    couponDate: bigint,
    investor: string,
    status: bigint,
    previousStatus: bigint
  ];
  export interface OutputObject {
    register: string;
    couponDate: bigint;
    investor: string;
    status: bigint;
    previousStatus: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Coupon extends BaseContract {
  connect(runner?: ContractRunner | null): Coupon;
  waitForDeployment(): Promise<this>;

  interface: CouponInterface;

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

  couponDate: TypedContractMethod<[], [bigint], "view">;

  cutOfTime: TypedContractMethod<[], [bigint], "view">;

  getInvestorPayments: TypedContractMethod<
    [_investor: AddressLike],
    [bigint],
    "view"
  >;

  getPaymentAmountForInvestor: TypedContractMethod<
    [_investor: AddressLike],
    [bigint],
    "view"
  >;

  getTotalPaymentAmount: TypedContractMethod<[], [bigint], "view">;

  investorPayments: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  nbDays: TypedContractMethod<[], [bigint], "view">;

  payingAgent: TypedContractMethod<[], [string], "view">;

  paymentIdForInvest: TypedContractMethod<
    [_investor: AddressLike],
    [string],
    "view"
  >;

  recordDate: TypedContractMethod<[], [bigint], "view">;

  register: TypedContractMethod<[], [string], "view">;

  rejectCoupon: TypedContractMethod<[], [void], "nonpayable">;

  setCutOffTime: TypedContractMethod<
    [_recordDate: BigNumberish, _cutOfTime: BigNumberish],
    [void],
    "nonpayable"
  >;

  setDateAsCurrentCoupon: TypedContractMethod<[], [void], "nonpayable">;

  setNbDays: TypedContractMethod<[_nbDays: BigNumberish], [void], "nonpayable">;

  status: TypedContractMethod<[], [bigint], "view">;

  toggleCouponPayment: TypedContractMethod<
    [_investor: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "couponDate"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "cutOfTime"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getInvestorPayments"
  ): TypedContractMethod<[_investor: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getPaymentAmountForInvestor"
  ): TypedContractMethod<[_investor: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getTotalPaymentAmount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "investorPayments"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "nbDays"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "payingAgent"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "paymentIdForInvest"
  ): TypedContractMethod<[_investor: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "recordDate"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "register"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "rejectCoupon"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setCutOffTime"
  ): TypedContractMethod<
    [_recordDate: BigNumberish, _cutOfTime: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setDateAsCurrentCoupon"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setNbDays"
  ): TypedContractMethod<[_nbDays: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "status"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "toggleCouponPayment"
  ): TypedContractMethod<[_investor: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "CouponChanged"
  ): TypedContractEvent<
    CouponChangedEvent.InputTuple,
    CouponChangedEvent.OutputTuple,
    CouponChangedEvent.OutputObject
  >;
  getEvent(
    key: "CouponPaymentStatusChanged"
  ): TypedContractEvent<
    CouponPaymentStatusChangedEvent.InputTuple,
    CouponPaymentStatusChangedEvent.OutputTuple,
    CouponPaymentStatusChangedEvent.OutputObject
  >;

  filters: {
    "CouponChanged(address,uint256,uint8)": TypedContractEvent<
      CouponChangedEvent.InputTuple,
      CouponChangedEvent.OutputTuple,
      CouponChangedEvent.OutputObject
    >;
    CouponChanged: TypedContractEvent<
      CouponChangedEvent.InputTuple,
      CouponChangedEvent.OutputTuple,
      CouponChangedEvent.OutputObject
    >;

    "CouponPaymentStatusChanged(address,uint256,address,uint8,uint8)": TypedContractEvent<
      CouponPaymentStatusChangedEvent.InputTuple,
      CouponPaymentStatusChangedEvent.OutputTuple,
      CouponPaymentStatusChangedEvent.OutputObject
    >;
    CouponPaymentStatusChanged: TypedContractEvent<
      CouponPaymentStatusChangedEvent.InputTuple,
      CouponPaymentStatusChangedEvent.OutputTuple,
      CouponPaymentStatusChangedEvent.OutputObject
    >;
  };
}
