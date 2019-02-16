# DutchX Subgraph

This is a hackathon project built on top of [The Graph](https://thegraph.com/) platform. The goal is to create a subgraph that interacts with the DutchX mainnet contracts.

> The DutchX is a fully decentralized trading protocol ("the Protocol"), which allows anyone to add any token pair. The only requirement is for tokens to be ERC20 compliant... [read more](https://github.com/gnosis/dx-contracts)

Subgraph explorer: https://thegraph.com/explorer/subgraph/g-r-a-n-t/dutchx

More information about the hackathon and competitive bounties can be found here:

- https://www.ethdenver.com/
- https://kauri.io/article/4d7af74855534454a5d57ca98ab8432a/v1/the-graph-sponsor-bounty-at-ethdenver-2019 (under bounty #2)
- https://gitcoin.co/issue/GnosisEcosystemFund/Gnosis-Bounties-/7/2361

## Subgraph Usage

The subgraph keeps track of auction scheduling and clearing. Using these events as the basis of the subgraph enables some interesting queries. Examples follow below:

### Price History
```
{
  auctions (
    where: {
      cleared: true
      sellToken: "0x255Aa6DF07540Cb5d3d297f0D0D4D84cb52bc8e6"
      buyToken: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    }
    orderBy: startTime
    orderDirection: desc
  ) {
    priceNum
    priceDen
  }
}
```
*Retrieve historic value of Raiden in Wrapped Ether.*

The query above will return the price of `RDN 0x25...` relative to `WETH 0xc0...` from all `cleared` auctions in descending order by `startTime`. The result should look something like this:

```
{
  "data": {
    "auctions": [
      {
        "priceDen": "5567148436390553526163",
        "priceNum": "11619822656640626064"
      },
      {
        "priceDen": "9333484796375526269824",
        "priceNum": "16265445328413562003"
      },
      {
        "priceDen": "4707817707800988949621",
        "priceNum": "8177690719278867468"
      },
      ...
    ]
  }
}
```

DutchX returns prices in terms of `uint256` numerators and denominators, so you must divide `priceNum` by `priceDen` and multiply it by `USD/ETH` to get a human friendly value. Performing this calculation on the first result will yield $0.25.

`11619822656640626064/5567148436390553526163 * 120 = .2504`

### Open Auctions
```
{
  auctions (
    where: {
      cleared: false
    }
  ) {
    sellToken
    buyToken
    auctionIndex
    startTime
  }
}
```
*Retreive all open auctions.*

The above query will filter all auctions on `cleared` and return the tokens being exchanged along with their index and start time. The `cleared` attribute indicates whether or not the auction is still open. The result should look something like this:
```
{
  "data": {
    "auctions": [
      {
        "auctionIndex": "1",
        "buyToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "sellToken": "0x255aa6df07540cb5d3d297f0d0d4d84cb52bc8e6",
        "startTime": "1549667770"
      },
      {
        "auctionIndex": "30",
        "buyToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "sellToken": "0x255aa6df07540cb5d3d297f0d0d4d84cb52bc8e6",
        "startTime": "1550354870"
      },
      {
        "auctionIndex": "1",
        "buyToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "sellToken": "0x543ff227f64aa17ea132bf9886cab5db55dcaddf",
        "startTime": "1550168112"
      }
      ...
    ]
  }
}
```

## Usefulness

The GraphQL syntax is pretty straight-forward, which makes it easier for developers to incorporate information from DutchX into their dapp than any other available method (that I'm aware of). This combined with the speed offered by caching makes this subgraph an attractive solution to anybody looking to retrieve data from DutchX.
