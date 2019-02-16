import { AuctionCleared } from './types/DutchExchange/DutchExchange'
import { Auction } from './types/schema'
import { Address, BigInt } from "@graphprotocol/graph-ts";


export function handleAuctionCleared(event: AuctionCleared): void {
  let params = event.params
  let auctionId = auctionId(params.sellToken, params.buyToken, params.auctionIndex)

  let auction = new Auction(auctionId)
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
