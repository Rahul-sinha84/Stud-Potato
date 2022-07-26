// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract StudPotato is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Stud-Potato", "STDP") {}

    event ProductReplaced(uint prevTokenId, uint newTokenId, address consumer);
    event ProductReturned(uint tokenId, address consumer);

    mapping(uint => address) private sellerOfToken;
    mapping(uint => uint) private validityFromToken;
    mapping(uint => returnInfo) private returnInfoFromTokenId;

    struct returnInfo {
        uint price;
        uint dateOfPurchase;
    }

    function safeMint(
        address to,
        string memory uri,
        address _seller,
        uint _validity,
        uint _price
    ) public payable onlyOwner {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _approve(_seller, tokenId);

        sellerOfToken[tokenId] = _seller;
        validityFromToken[tokenId] = _validity;

        returnInfo memory _returnInfo = returnInfo(_price, block.timestamp);
        returnInfoFromTokenId[tokenId] = _returnInfo;
    }

    function burnToken(uint tokenId) public {
        require(
            _isApprovedOrOwner(msg.sender, tokenId),
            "You are not approved !!"
        );
        _burn(tokenId);

        delete sellerOfToken[tokenId];
        if (returnInfoFromTokenId[tokenId].dateOfPurchase != 0)
            delete returnInfoFromTokenId[tokenId];
        delete validityFromToken[tokenId];
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // for returning the product
    function returnProduct(uint tokenId) public {
        require(
            msg.sender == sellerOfToken[tokenId],
            "Only seller required !!"
        );
        require(
            block.timestamp <=
                returnInfoFromTokenId[tokenId].dateOfPurchase + 10 days,
            "Return period is over already !!"
        );

        uint priceOfProduct = returnInfoFromTokenId[tokenId].price;
        address consumer = ownerOf(tokenId);
        burnToken(tokenId);

        // transferring the money back to consumer
        (bool success, ) = payable(consumer).call{value: priceOfProduct}("");

        require(success, "Money transferred back successfully !!");

        emit ProductReturned(tokenId, consumer);
    }

    //for replacing the product
    function replaceProduct(uint tokenId, string memory _uri) public {
        require(
            sellerOfToken[tokenId] == msg.sender,
            "Only seller required !!"
        );
        require(
            validityFromToken[tokenId] > block.timestamp,
            "Warranty period is over !!"
        );

        // new token minted with updated uri, same validity and
        // 0 price (as we don't need to provide any return facility after replacement);
        safeMint(
            ownerOf(tokenId),
            _uri,
            msg.sender,
            validityFromToken[tokenId],
            0
        );

        // delete the return info for restricting the return facility
        uint latestTokenId = getLatestTokenId();
        delete returnInfoFromTokenId[latestTokenId];

        // burning the old token which is being replaced
        burnToken(tokenId);

        emit ProductReplaced(tokenId, latestTokenId, ownerOf(latestTokenId));
    }

    // for transferring the holded money back to the seller, after the return period is over
    function sendMoneyToSeller(uint tokenId) public {
        require(
            msg.sender == sellerOfToken[tokenId],
            "Only seller of the product is required !!"
        );
        require(
            returnInfoFromTokenId[tokenId].price != 0,
            "Money already withdrawn !!"
        );

        require(
            returnInfoFromTokenId[tokenId].dateOfPurchase + 10 days <
                block.timestamp,
            "Return period is not over !!"
        );

        (bool success, ) = payable(sellerOfToken[tokenId]).call{
            value: returnInfoFromTokenId[tokenId].price
        }("");

        require(success, "Money Transferring failed !!");

        //there is no need of the returnInfo once the return period is over
        delete returnInfoFromTokenId[tokenId];
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function getLatestTokenId() public view returns (uint) {
        return _tokenIdCounter.current();
    }

    function getOwnerFromTokenId(uint tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }

    function getSellerFromTokenId(uint tokenId) public view returns (address) {
        return sellerOfToken[tokenId];
    }

    function getValidityFromTokenId(uint tokenId) public view returns (uint) {
        return validityFromToken[tokenId];
    }

    function getReturnInfoFromTokenId(uint tokenId)
        public
        view
        returns (uint price, uint dateOfPurchase)
    {
        price = returnInfoFromTokenId[tokenId].price;
        dateOfPurchase = returnInfoFromTokenId[tokenId].dateOfPurchase;
    }
}
