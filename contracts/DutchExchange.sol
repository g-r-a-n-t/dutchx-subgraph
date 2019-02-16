pragma solidity ^0.5.2;

// a simple interface containing only the functions that we are interested in.
interface DutchExchange {
  function getPriceOfTokenInLastAuction(address token) external view returns (uint num, uint den);
}
