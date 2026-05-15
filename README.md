# Draft Master

A solo Magic: The Gathering booster draft simulator built with React.

**[Live Demo](https://draft-master-ten.vercel.app/)**

## What it does

Simulates a full 8-player booster draft against 7 bots. Standard draft rules — 3 packs of 14 cards, correct pack passing direction per round (left, right, left). Bots pick randomly. Cards sourced live from the Scryfall API.

## Status

This is a work in progress. Current build covers Stage 1 — the core draft engine and very basic UI. The draft runs to completion and your full card pool is shown as you pick.

**Planned stages:**

- Deck builder from drafted cards
- Deck analysis — mana curve, colour distribution, creature counts
- Set selection UI
- Smart bot picks

## Running locally

```bash
npm install
npm run dev
```

## Tech

React 19, Vite, Scryfall API (no key required)
