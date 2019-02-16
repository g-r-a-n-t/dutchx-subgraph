pragma solidity ^0.5.0;

interface DutchExchange {
  function getPriceInPastAuction(address token1, address token2, uint auctionIndex) external view returns (uint num, uint den);

  event AuctionCleared(
      address indexed sellToken,
      address indexed buyToken,
      uint sellVolume,
      uint buyVolume,
      uint indexed auctionIndex
  );
}
