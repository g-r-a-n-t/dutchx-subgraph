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

export class Incremented extends EthereumEvent {
  get params(): IncrementedParams {
    return new IncrementedParams(this);
  }
}

export class IncrementedParams {
  _event: Incremented;

  constructor(event: Incremented) {
    this._event = event;
  }

  get value(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class Counter extends SmartContract {
  static bind(address: Address): Counter {
    return new Counter("Counter", address);
  }

  value(): BigInt {
    let result = super.call("value", []);
    return result[0].toBigInt();
  }
}
