pragma solidity ^0.4.21;

contract Storage {
    mapping (bytes32 => bytes) dataStorage;

    event Store(bytes32 indexed dataHash, address indexed owner);

    function store(bytes32 dataHash, bytes data, address owner) public {
        dataStorage[dataHash] = data;
        Store(dataHash, owner);
    }

    function getRecord(bytes32 dataHash) public view returns (bytes data) {
        data = dataStorage[dataHash];
    }
}