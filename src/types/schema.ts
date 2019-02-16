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

export class Auction extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Auction entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Auction entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Auction", id.toString(), this);
  }

  static load(id: string): Auction | null {
    return store.get("Auction", id) as Auction | null;
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

  get priceNum(): BigInt {
    let value = this.get("priceNum");
    return value.toBigInt();
  }

  set priceNum(value: BigInt) {
    this.set("priceNum", Value.fromBigInt(value));
  }

  get priceDen(): BigInt {
    let value = this.get("priceDen");
    return value.toBigInt();
  }

  set priceDen(value: BigInt) {
    this.set("priceDen", Value.fromBigInt(value));
  }

  get cleared(): boolean {
    let value = this.get("cleared");
    return value.toBoolean();
  }

  set cleared(value: boolean) {
    this.set("cleared", Value.fromBoolean(value));
  }

  get startTime(): BigInt {
    let value = this.get("startTime");
    return value.toBigInt();
  }

  set startTime(value: BigInt) {
    this.set("startTime", Value.fromBigInt(value));
  }

  get clearingTime(): BigInt {
    let value = this.get("clearingTime");
    return value.toBigInt();
  }

  set clearingTime(value: BigInt) {
    this.set("clearingTime", Value.fromBigInt(value));
  }
}
