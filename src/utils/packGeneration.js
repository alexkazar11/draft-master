// Hard-coded now, but needs to be extracted into JSON file & imported
const PACK_CONFIG = {
  rare: { count: 1, odds: { mythic: 0.15, rare: 0.85 } },
  wildcard: {
    count: 1,
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
    let type = pickOddsType(thresholds);
    pack.push(...pickRandomCards(type, cardPool, count));
  }

  return pack;
}

function generatePacks(cards, count = 1) {
  const pool = buildCardPools(cards);

  let packs = [];

  for (let i = 0; i < count; i++) {
    packs.push(generatePack(pool, PROCESSED_CONFIG));
  }

  return packs;
}

export default generatePacks;
