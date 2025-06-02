// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtToken is ERC20, Ownable {
    uint256 public immutable maxSupply;

    constructor(
        string memory name,
        string memory symbol,
        uint256 _maxSupply,
        address platform,
        address artist
    ) ERC20(name, symbol) Ownable(msg.sender) {
        require(platform != address(0), "Invalid platform address");
        require(artist != address(0), "Invalid artist address");
        require(_maxSupply > 0, "Max supply must be greater than zero");

        maxSupply = _maxSupply * 10 ** decimals();

        uint256 artistShare = (maxSupply * 70) / 100;
        uint256 platformShare = maxSupply - artistShare;

        _mint(artist, artistShare);
        _mint(platform, platformShare);
    }
}
