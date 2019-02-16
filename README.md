# DutchX Subgraph

This is a hackathon project built on top of [The Graph](https://thegraph.com/) platform. The goal is to create a subgraph that interacts with the DutchX mainnet contracts.

> The DutchX is a fully decentralized trading protocol ("the Protocol"), which allows anyone to add any token pair. The only requirement is for tokens to be ERC20 compliant... [read more](https://github.com/gnosis/dx-contracts)

Subgraph explorer: https://thegraph.com/explorer/subgraph/g-r-a-n-t/dutchx

More information about the hackathon and competative bounties can be found here:

- https://www.ethdenver.com/
- https://kauri.io/article/4d7af74855534454a5d57ca98ab8432a/v1/the-graph-sponsor-bounty-at-ethdenver-2019 (under bounty #2)
- https://gitcoin.co/issue/GnosisEcosystemFund/Gnosis-Bounties-/7/2361

## Subgraph Usage
The subgraph keeps track of auction scheduling and clearing. Using these events as the basis of the subgraph allows for a rich set of useful queries. Some examples follow below:

### Example #1
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
*Retrieve historic value of Raiden (`RDN`) to Wrapped Ether (`WETH`). In this case, all auctions are filtered against the `RDN` and `WETH` contract addess, which are set inside of the `where` clause.*

The query shown above will return the price attributes of `RDN` relative to `WETH` from all `cleared` auctions. It should look something like this:

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

Of course, Solidity can only return integers, so you must divide the `priceNum` by `priceDen` to get a human friendly value of `RDN` and multiply it by `USD/ETH`. Performing this calculation on the first result above yields `~$0.25`.

`11619822656640626064/5567148436390553526163 * 120 = .2504`

### Example #2
