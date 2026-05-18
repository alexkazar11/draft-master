// Scryfall API — fetches and caches card data by set code

const SCRYFALL_API = "https://api.scryfall.com";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const CARD_SEARCH_DELAY_MS = 500;
const SETS_REQUEST_DELAY_MS = 100;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getCache(key) {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { timestamp, data } = JSON.parse(cached);

    if (!timestamp || !Array.isArray(data)) return null;

    return Date.now() - timestamp < CACHE_TTL_MS ? data : null;
  } catch {
    return null;
  }
}

function setCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
  } catch {
    // Ignore cache failures.
  }
}

function getCardImage(card) {
  return (
    card.image_uris?.normal ?? card.card_faces?.[0]?.image_uris?.normal ?? null
  );
}

function normalizeCard(card) {
  return {
    id: card.id,
    name: card.name,
    rarity: card.rarity,
    image: getCardImage(card),
    type_line: card.type_line,
    mana_cost: card.mana_cost,
    colors: card.colors ?? [],
  };
}

async function fetchPage(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Scryfall request failed: ${response.status}`);
  }

  return response.json();
}

function normalizeSet(set) {
  return {
    id: set.id,
    name: set.name,
    code: set.code,
    released: set.released_at,
    cardCount: set.card_count,
    icon: set.icon_svg_uri,
  };
}

function isReleased(dateStr) {
  const today = new Date().toISOString().slice(0, 10);
  return dateStr < today;
}

function isDraftable(set) {
  return set.set_type === "expansion" && isReleased(set.released_at);
}

export async function fetchAllSets() {
  const cacheKey = `mtg_sets`;
  const cachedSets = getCache(cacheKey);

  if (cachedSets) return cachedSets;

  let url = `${SCRYFALL_API}/sets`;

  const sets = [];

  while (url) {
    const response = await fetchPage(url);

    sets.push(...response.data.filter(isDraftable).map(normalizeSet));

    url = response.has_more ? response.next_page : null;

    if (url) {
      await delay(SETS_REQUEST_DELAY_MS);
    }
  }

  setCache(cacheKey, sets);

  return sets;
}

export async function fetchSet(setCode) {
  const normalizedSetCode = setCode.toLowerCase();
  const cacheKey = `mtg_cards_${normalizedSetCode}`;
  const cachedCards = getCache(cacheKey);

  if (cachedCards) return cachedCards;

  let url = `${SCRYFALL_API}/cards/search?order=set&q=e%3A${normalizedSetCode}&unique=cards`;

  const cards = [];

  while (url) {
    const response = await fetchPage(url);

    cards.push(...response.data.map(normalizeCard));

    url = response.has_more ? response.next_page : null;

    if (url) {
      await delay(CARD_SEARCH_DELAY_MS);
    }
  }

  setCache(cacheKey, cards);

  return cards;
}

export default fetchSet;
