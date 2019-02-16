import { Counter as Contract, Incremented } from './types/Counter/Counter'
import { AuctionCleared } from './types/DutchExchange/DutchExchange'
import { Counter, Auction } from './types/schema'

export function handleIncremented(event: Incremented): void {
  let counter = Counter.load('default-counter')
  if (counter == null) {
    counter = new Counter('default-counter')
  }
  counter.value = event.params.value
  counter.save()
}

export function handleAuctionCleared(event: AuctionCleared): void {
  let auction = new Auction(event.params.auctionIndex.toString())
  auction.sellToken = event.params.sellToken
  auction.buyToken = event.params.buyToken
  auction.sellVolume = event.params.sellVolume
  auction.buyVolume = event.params.buyVolume
  auction.save()
}
