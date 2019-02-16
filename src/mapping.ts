import { AuctionCleared, AuctionStartScheduled, DutchExchange } from './types/DutchExchange/DutchExchange'
import { Auction } from './types/schema'
import { Address, BigInt } from "@graphprotocol/graph-ts";

export function handleAuctionCleared(event: AuctionCleared): void {
  // for ease of use
  let params = event.params

  // get the final price of the tokens (sell / buy)
  let dutchExchange = DutchExchange.bind(event.address)
  let price = dutchExchange.getPriceInPastAuction(params.sellToken, params.buyToken, params.auctionIndex)

  // auction should already exist, but if not, create a new one
  let auctionId = auctionId(params.sellToken, params.buyToken, params.auctionIndex)
  let auction = Auction.load(auctionId)
  if (auction == null) {
    auction = new Auction(auctionId)
    auction.sellToken = params.sellToken
    auction.buyToken = params.buyToken
    auction.auctionIndex = params.auctionIndex
  }

  // assign new values to the entity
  auction.sellVolume = params.sellVolume
  auction.buyVolume = params.buyVolume
  auction.priceNum = price.value0
  auction.priceDen = price.value1
  auction.cleared = true
  auction.save()
}


export function handleAuctionStartScheduled(event: AuctionStartScheduled): void {
  // for ease of use
  let params = event.params

  let auctionId = auctionId(params.sellToken, params.buyToken, params.auctionIndex)
  let auction = new Auction(auctionId)
  auction.sellToken = params.sellToken
  auction.buyToken = params.buyToken
  auction.auctionIndex = params.auctionIndex
  auction.sellVolume = 0
  auction.buyVolume = 0
  auction.priceNum = 0
  auction.priceDen = 0
  auction.cleared = false
  auction.save()
}

function auctionId(sellToken: Address, buyToken: Address, auctionIndex: BigInt): string {
  return sellToken.toHex() + '-' + buyToken.toHex() + '-' + auctionIndex.toString();
}
