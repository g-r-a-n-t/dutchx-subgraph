pragma solidity ^0.5.0;

// using a thin interface instead of importing the whole dx contract suite
interface DutchExchange {
  function getPriceInPastAuction(address token1, address token2, uint auctionIndex) external view returns (uint num, uint den);
  function getClearingTime(address token1, address token2, uint auctionIndex) external view returns (uint time);

  event AuctionCleared(
      address indexed sellToken,
      address indexed buyToken,
      uint sellVolume,
      uint buyVolume,
      uint indexed auctionIndex
  );

  event AuctionStartScheduled(
      address indexed sellToken,
      address indexed buyToken,
      uint indexed auctionIndex,
      uint auctionStart
  );
}
