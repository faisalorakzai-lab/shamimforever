// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.20;

  /**
   * @title  ShamimBloomNFT
   * @notice ERC-721 Sovereign Passport for Shamim Bloom — House of Shamim Forever
   *         Polygon Mainnet · OpenSea Compatible · Burn Disabled
   *
   * Deployment (using Remix or Hardhat):
   *   1. Compile with Solidity 0.8.20 + OpenZeppelin Contracts 5.x
   *   2. Deploy with constructor(owner, baseURI)
   *      owner   = your Polygon wallet (receives mint rights)
   *      baseURI = https://www.shamimforever.com/api/nft/metadata/
   *   3. Verify on Polygonscan for OpenSea compatibility
   */

  import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
  import "@openzeppelin/contracts/access/Ownable.sol";
  import "@openzeppelin/contracts/utils/Counters.sol";

  contract ShamimBloomNFT is ERC721URIStorage, Ownable {
      using Counters for Counters.Counter;
      Counters.Counter private _tokenIds;

      string public collectionName  = "House of Shamim Forever";
      string public collectionSymbol = "SBLOOM";
      uint256 public constant MAX_SUPPLY = 50; // Founder Reserve — 50 pieces only

      event SovereignMinted(
          uint256 indexed tokenId,
          address indexed recipient,
          string tokenURI,
          uint256 timestamp
      );

      constructor(address initialOwner, string memory baseURI)
          ERC721("Shamim Bloom — Sovereign Passport", "SBLOOM")
          Ownable(initialOwner)
      {}

      /**
       * @notice Mint a Sovereign Passport NFT to a buyer's wallet
       * @param  recipient  Buyer's Polygon wallet address
       * @param  uri        Full metadata URI (https://www.shamimforever.com/api/nft/metadata/{id})
       */
      function safeMint(address recipient, string memory uri)
          external
          onlyOwner
          returns (uint256)
      {
          require(_tokenIds.current() < MAX_SUPPLY, "Founder Reserve: all 50 minted");

          _tokenIds.increment();
          uint256 newId = _tokenIds.current();

          _safeMint(recipient, newId);
          _setTokenURI(newId, uri);

          emit SovereignMinted(newId, recipient, uri, block.timestamp);
          return newId;
      }

      /**
       * @notice Total NFTs minted so far
       */
      function totalSupply() external view returns (uint256) {
          return _tokenIds.current();
      }

      /**
       * @notice Remaining in Founder Reserve
       */
      function remainingSupply() external view returns (uint256) {
          return MAX_SUPPLY - _tokenIds.current();
      }

      /**
       * @dev Burn is permanently disabled — Sovereign Passports are indestructible
       */
      function _burn(uint256) internal pure override {
          revert("Sovereign Passport: burn is disabled");
      }

      /**
       * @notice OpenSea storefront metadata
       */
      function contractURI() external pure returns (string memory) {
          return "https://www.shamimforever.com/api/nft/contract";
      }
  }
  