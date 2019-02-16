import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt
} from "@graphprotocol/graph-ts";

export class Counter extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Counter entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Counter entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Counter", id.toString(), this);
  }

  static load(id: string): Counter | null {
    return store.get("Counter", id) as Counter | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }
}

export class AuctionCleared extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save AuctionCleared entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save AuctionCleared entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("AuctionCleared", id.toString(), this);
  }

  static load(id: string): AuctionCleared | null {
    return store.get("AuctionCleared", id) as AuctionCleared | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get sellToken(): Bytes {
    let value = this.get("sellToken");
    return value.toBytes();
  }

  set sellToken(value: Bytes) {
    this.set("sellToken", Value.fromBytes(value));
  }

  get buyToken(): Bytes {
    let value = this.get("buyToken");
    return value.toBytes();
  }

  set buyToken(value: Bytes) {
    this.set("buyToken", Value.fromBytes(value));
  }

  get sellVolume(): BigInt {
    let value = this.get("sellVolume");
    return value.toBigInt();
  }

  set sellVolume(value: BigInt) {
    this.set("sellVolume", Value.fromBigInt(value));
  }

  get buyVolume(): BigInt {
    let value = this.get("buyVolume");
    return value.toBigInt();
  }

  set buyVolume(value: BigInt) {
    this.set("buyVolume", Value.fromBigInt(value));
  }

  get auctionIndex(): BigInt {
    let value = this.get("auctionIndex");
    return value.toBigInt();
  }

  set auctionIndex(value: BigInt) {
    this.set("auctionIndex", Value.fromBigInt(value));
  }
}
