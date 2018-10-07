pragma solidity ^0.4.21;

contract Storage {
    mapping (bytes32 => string) dataStorage;

    event Store(bytes32 indexed dataHash, address indexed owner);

    function store(bytes32 dataHash, string data, address owner) public {
        dataStorage[dataHash] = data;
        Store(dataHash, owner);
    }

    function get(bytes32 dataHash) public view returns (string data) {
        data = dataStorage[dataHash];
    }
}