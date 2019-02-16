import { AuctionCleared } from './types/DutchExchange/DutchExchange'
import { Auction } from './types/schema'

export function handleAuctionCleared(event: AuctionCleared): void {
  let auction = new Auction(event.params.auctionIndex.toString())
  auction.sellToken = event.params.sellToken
  auction.buyToken = event.params.buyToken
  auction.sellVolume = event.params.sellVolume
  auction.buyVolume = event.params.buyVolume
  auction.save()
}
