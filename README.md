#  Transdimensional Inventory Service

Transdimensional Inventory Service (TIS) is a project that aims to bridge the gap
between Web3 and the metaverse - or more accurately, the fractured web of
metaverses.

The goal of the project is to provide ways to share items across multiple
metaverses whether that be just data or functionality.

So far, the following has been made:

- Centralized TIS API
- Example converting Roblox assets to Polygon NFTs and loading them into an
  Roblox place.

## Roblox Example

[Live Demo](https://www.roblox.com/games/8057320078/Juicenows-NFT-Collection)

There is a script for creating NFTs from Roblox assets.

Players in the place are able to view all of a certain wallet's NFTs (in the
example, it is my wallet since it is my place). They are also able to
spawn in any NFT that has the `roblox_asset_id` field its metadata.

Roblox Studio is required to work on the place.

## API

Provides functions to assist metaverse

Requirements: `yarn`

Create a `.env` file with `COVALENT_API_KEY` set to your Covalent API key.

Installation:

- `nvm use 14`
- `npm install -g yarn`
- `yarn`

Running:

- `yarn start`

View an inventory for a given ethereum wallet addresss

GET `/inventory/:address`
