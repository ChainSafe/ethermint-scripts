pragma solidity ^0.5.11;

contract Logger {
  event event1();

  event event2();

  function emitTest(bool _name) public {
    if (_name) {
      emit event1();
    } else {
      emit event2();
    }
  }
}