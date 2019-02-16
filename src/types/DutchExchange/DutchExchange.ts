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

export class DutchExchange__getPriceOfTokenInLastAuctionResult {
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

  getPriceOfTokenInLastAuction(
    token: Address
  ): DutchExchange__getPriceOfTokenInLastAuctionResult {
    let result = super.call("getPriceOfTokenInLastAuction", [
      EthereumValue.fromAddress(token)
    ]);
    return new DutchExchange__getPriceOfTokenInLastAuctionResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }
}