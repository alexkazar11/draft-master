export const NUM_PLAYERS = 8;
export const NUM_PACKS = 3;

export const PACK_CONFIG = {
  rare: { count: 1, odds: { mythic: 0.15, rare: 0.85 } },
  wildcard: {
    count: 3,
    odds: {
      mythic: 0.02,
      rare: 0.2,
      uncommon: 0.39,
      common: 0.39,
    },
  },
  uncommon: { count: 3, odds: { uncommon: 1 } },
  common: { count: 6, odds: { common: 1 } },
  land: { count: 1, odds: { land: 1 } },
};
