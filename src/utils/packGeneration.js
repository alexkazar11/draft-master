import { NUM_PLAYERS, NUM_PACKS, PACK_CONFIG } from "../config/draftConfig.js";

const PROCESSED_CONFIG = Object.values(PACK_CONFIG).map((details) => ({
  count: details.count,
  thresholds: buildThresholds(details.odds),
}));

function buildCardPools(cards) {
  let cardPools = {
    common: [],
    uncommon: [],
    rare: [],
    mythic: [],
    land: [],
  };

  for (let card of cards) {
    switch (card.rarity) {
      case "common":
        if (card.type_line.includes("Land")) {
          cardPools.land.push(card);
          break;
        }
        cardPools.common.push(card);
        break;
      case "uncommon":
        cardPools.uncommon.push(card);
        break;
      case "rare":
        cardPools.rare.push(card);
        break;
      case "mythic":
        cardPools.mythic.push(card);
        break;
    }
  }

  return cardPools;
}

//Fisher-Yates shuffle
function shuffle(pool) {
  const arr = [...pool];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickRandomCards(type, cardPool, count = 1) {
  return shuffle(cardPool[type]).slice(0, count);
}

function buildThresholds(odds) {
  let cumulative = 0;

  return Object.entries(odds).map(([type, prob]) => {
    cumulative += prob;
    return { type, threshold: cumulative };
  });
}

function pickOddsType(thresholds) {
  const rand = Math.random();
  return thresholds.find((t) => rand < t.threshold).type;
}

function generatePack(cardPool, config) {
  let pack = [];

  for (const { count, thresholds } of config) {
    if (thresholds.length > 1) {
      for (let i = 0; i < count; i++) {
        const type = pickOddsType(thresholds);
        pack.push(...pickRandomCards(type, cardPool, 1));
      }
    } else {
      const type = pickOddsType(thresholds);
      pack.push(...pickRandomCards(type, cardPool, count));
    }
  }

  return pack;
}

function generatePacks(cards) {
  const pool = buildCardPools(cards);

  return Array.from({ length: NUM_PACKS }, () =>
    Array.from({ length: NUM_PLAYERS }, () =>
      generatePack(pool, PROCESSED_CONFIG),
    ),
  );
}

export default generatePacks;
