// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MeditationCertificate is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Ownable
{
    using Counters for Counters.Counter;

    mapping(uint256 => address) _tokenToUser;
    mapping(address => uint256) _dateToUser;
    Counters.Counter private _tokenIdCounter;

    /*
     * Modifiers
     */
    modifier notFinishedTheDay(address user) {
        // people only should get one token per day
        // require(!_dateToUser[user], "User already  meditated");
        _;
    }

    constructor() ERC721("Meditation Certificate", "MCT") {}

    function mint(
        address to,
        string memory _uri,
        uint256 _date
    ) public notFinishedTheDay(to) {
        _dateToUser[to] = _date;
        safeMint((to), _uri);
    }

    function safeMint(address to, string memory uri) internal onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function snapshot() public onlyOwner {
        // should be executed daily
        // _snapshot();
    }

    function distribute() public onlyOwner {
        // at the end of the cohort this function should be executed and the pool should be distrbuted between the users based on the snapshots
    }

    function widthdraw() public onlyOwner {
        // Members can withdraw funds after each Cohort (Month)
        // Withdraw has 7 days? waiting period
    }

    function tokensOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        // string[] memory userTokens = new string[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
            // if(tokensId[i]  == i){
            //    userTokens[i] = tokensList[i];
            // }
        }
        return tokenIds;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
