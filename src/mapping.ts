import { AuctionCleared } from './types/DutchExchange/DutchExchange'
import { Auction } from './types/schema'

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


export function handleAuctionCleared(event: AuctionCleared): void {
  let params = event.params;

  let auction = new Auction(auctionId(params.sellToken, params.buyToken, params.auctionIndex))
  auction.sellToken = params.sellToken
  auction.buyToken = params.buyToken
  auction.sellVolume = params.sellVolume
  auction.buyVolume = params.buyVolume
  auction.auctionIndex = params.auctionIndex
  auction.save()
}

function auctionId(sellToken: Address, buyToken: Address, auctionIndex: BigInt): string {
  return sellToken.toHex() + '-' + buyToken.toHex() + '-' + auctionIndex.toString();
}
