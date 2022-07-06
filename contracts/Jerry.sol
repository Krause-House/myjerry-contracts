//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Jerry is Ownable, ERC721 {
    uint256 public price;
    address ticketAddress;
    uint256 public supply;
    string baseURI;

    constructor(uint256 initialPrice) ERC721("Jerry", "JER") {
        price = initialPrice;
    }

    function setBaseUri(string memory uri) public onlyOwner {
        baseURI = uri;
    }

    function setTicketAddress(address _address) public onlyOwner {
        ticketAddress = _address;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function mint() public payable {
        if (ERC721(ticketAddress).balanceOf(msg.sender) == 0) {
            require(msg.value >= price, "Jerry: Must pay full price");
        }

        uint256 _supply = supply;
        supply += 1;
        _safeMint(msg.sender, _supply);
    }

    function _transfer(
        address,
        address,
        uint256
    ) internal pure override {
        revert("Jerry: Cannot transfer");
    }
}
