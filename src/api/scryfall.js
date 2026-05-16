// Scryfall API — fetches and caches card data by set code

const SCRYFALL_API = "https://api.scryfall.com";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const REQUEST_DELAY_MS = 500;

function cacheKey(setCode) {
  return `mtg_cards_${setCode}`;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getCachedCards(setCode) {
  try {
    const cached = localStorage.getItem(cacheKey(setCode));
    if (!cached) return null;

    const { timestamp, cards } = JSON.parse(cached);

    if (!timestamp || !Array.isArray(cards)) return null;

    return Date.now() - timestamp < CACHE_TTL_MS ? cards : null;
  } catch {
    return null;
  }
}

function setCache(setCode, cards) {
  try {
    localStorage.setItem(
      cacheKey(setCode),
      JSON.stringify({ timestamp: Date.now(), cards }),
    );
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
  let url = `${SCRYFALL_API}/sets`;

  const sets = [];

  while (url) {
    const response = await fetchPage(url);

    sets.push(...response.data.filter(isDraftable).map(normalizeSet));

    url = response.has_more ? response.next_page : null;

    if (url) {
      await delay(REQUEST_DELAY_MS);
    }
  }

  return sets;
}

export async function fetchSet(setCode) {
  const normalizedSetCode = setCode.toLowerCase();
  const cachedCards = getCachedCards(normalizedSetCode);

  if (cachedCards) return cachedCards;

  let url = `${SCRYFALL_API}/cards/search?order=set&q=e%3A${normalizedSetCode}&unique=cards`;

  const cards = [];

  while (url) {
    const response = await fetchPage(url);

    cards.push(...response.data.map(normalizeCard));

    url = response.has_more ? response.next_page : null;

    if (url) {
      await delay(REQUEST_DELAY_MS);
    }
  }

  setCache(normalizedSetCode, cards);

  return cards;
}

export default fetchSet;
