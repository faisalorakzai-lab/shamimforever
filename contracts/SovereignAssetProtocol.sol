// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title SovereignAssetProtocol
/// @notice Shamim Forever — Sovereign Luxury NFT Registry
/// @dev ERC721 + ERC2981 Royalties + OpenSea compatible + Serial Registry
contract SovereignAssetProtocol is ERC721, ERC721URIStorage, ERC721Enumerable, ERC721Pausable, ERC2981, Ownable {
    
    uint256 private _nextTokenId;
    
    mapping(string => uint256) private _serialToTokenId;
    mapping(uint256 => string) private _tokenIdToSerial;
    mapping(uint256 => string) private _tokenIdToRarity;

    event AssetMinted(uint256 indexed tokenId, string serialNumber, string rarityTier, address indexed owner);
    event ProvenanceUpdated(uint256 indexed tokenId, address indexed previousOwner, address indexed newOwner);

    constructor(address initialOwner, uint96 defaultRoyaltyFeeNumerator) 
        ERC721("Shamim Forever Sovereign Assets", "SFASSET") 
        Ownable(initialOwner) 
    {
        _setDefaultRoyalty(initialOwner, defaultRoyaltyFeeNumerator);
    }

    /// @notice Mint a sovereign luxury asset NFT
    function mintSovereignAsset(
        address to, 
        string memory uri, 
        string memory serialNumber,
        string memory rarityTier
    ) public onlyOwner returns (uint256) {
        require(bytes(serialNumber).length > 0, "Serial required");
        require(_serialToTokenId[serialNumber] == 0, "Serial already registered");
        
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        _serialToTokenId[serialNumber] = tokenId;
        _tokenIdToSerial[tokenId] = serialNumber;
        _tokenIdToRarity[tokenId] = rarityTier;

        emit AssetMinted(tokenId, serialNumber, rarityTier, to);
        return tokenId;
    }

    /// @notice Get token ID from serial number
    function getTokenBySerial(string memory serialNumber) public view returns (uint256) {
        return _serialToTokenId[serialNumber];
    }

    /// @notice Get serial number from token ID
    function getSerialByToken(uint256 tokenId) public view returns (string memory) {
        return _tokenIdToSerial[tokenId];
    }

    /// @notice Get rarity tier from token ID
    function getRarityByToken(uint256 tokenId) public view returns (string memory) {
        return _tokenIdToRarity[tokenId];
    }

    /// @notice Set per-token royalty (for 1/1 bespoke items)
    function setTokenRoyalty(uint256 tokenId, address receiver, uint96 feeNumerator) public onlyOwner {
        _setTokenRoyalty(tokenId, receiver, feeNumerator);
    }

    function pause() public onlyOwner { _pause(); }
    function unpause() public onlyOwner { _unpause(); }

    // Required overrides

    function _update(address to, uint256 tokenId, address auth)
        internal override(ERC721, ERC721Enumerable, ERC721Pausable) returns (address)
    {
        address previousOwner = super._update(to, tokenId, auth);
        if (previousOwner != address(0) && previousOwner != to) {
            emit ProvenanceUpdated(tokenId, previousOwner, to);
        }
        return previousOwner;
    }

    function _increaseBalance(address account, uint128 value) 
        internal override(ERC721, ERC721Enumerable) { super._increaseBalance(account, value); }

    function tokenURI(uint256 tokenId) 
        public view override(ERC721, ERC721URIStorage) returns (string memory) { return super.tokenURI(tokenId); }

    function supportsInterface(bytes4 interfaceId) 
        public view override(ERC721, ERC721Enumerable, ERC2981) returns (bool) { return super.supportsInterface(interfaceId); }
}
