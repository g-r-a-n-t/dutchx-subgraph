import {
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AuctionCleared extends EthereumEvent {
  get params(): AuctionClearedParams {
    return new AuctionClearedParams(this);
  }
}

export class AuctionClearedParams {
  _event: AuctionCleared;

  constructor(event: AuctionCleared) {
    this._event = event;
  }

  get sellToken(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get buyToken(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sellVolume(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get buyVolume(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get auctionIndex(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class AuctionStartScheduled extends EthereumEvent {
  get params(): AuctionStartScheduledParams {
    return new AuctionStartScheduledParams(this);
  }
}

export class AuctionStartScheduledParams {
  _event: AuctionStartScheduled;

  constructor(event: AuctionStartScheduled) {
    this._event = event;
  }

  get sellToken(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get buyToken(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get auctionIndex(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get auctionStart(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class DutchExchange__getPriceInPastAuctionResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromUnsignedBigInt(this.value0));
    map.set("value1", EthereumValue.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class DutchExchange extends SmartContract {
  static bind(address: Address): DutchExchange {
    return new DutchExchange("DutchExchange", address);
  }

  getPriceInPastAuction(
    token1: Address,
    token2: Address,
    auctionIndex: BigInt
  ): DutchExchange__getPriceInPastAuctionResult {
    let result = super.call("getPriceInPastAuction", [
      EthereumValue.fromAddress(token1),
      EthereumValue.fromAddress(token2),
      EthereumValue.fromUnsignedBigInt(auctionIndex)
    ]);
    return new DutchExchange__getPriceInPastAuctionResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }
}
