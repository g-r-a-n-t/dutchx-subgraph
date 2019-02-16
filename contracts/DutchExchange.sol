pragma solidity ^0.5.0;

interface DutchExchange {
  function getPriceOfTokenInLastAuction(address token) external view returns (uint num, uint den);

  event AuctionCleared(
      address indexed sellToken,
      address indexed buyToken,
      uint sellVolume,
      uint buyVolume,
      uint indexed auctionIndex
  );
}


