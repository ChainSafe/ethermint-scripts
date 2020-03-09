pragma solidity ^0.6.1;

contract Logger {
  event event1(uint256 count);

  event event2(address indexed owner);

  function emitTest(bool _name) public {
    if (_name) {
      emit event1(256);
    } else {
      emit event2(msg.sender);
    }
  }
}