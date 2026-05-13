// Scryfall API — fetches and caches card data by set code

const SCRYFALL_API = "https://api.scryfall.com";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getCachedCards(setCode) {
  const cached = localStorage.getItem(`mtg_cards_${setCode}`);

  if (cached) {
    const { timestamp, cards } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL_MS) {
      return cards;
    }
  }
}

function setCache(setCode, data) {
  localStorage.setItem(
    `mtg_cards_${setCode}`,
    JSON.stringify({ timestamp: Date.now(), cards: data }),
  );
}

function normalizeCard(card) {
  return {
    id: card.id,
    name: card.name,
    rarity: card.rarity,
    image: card.image_uris?.normal,
    type_line: card.type_line,
    mana_cost: card.mana_cost,
    colors: card.colors,
  };
}

async function fetchPage(url) {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error(`fetchPage failed for ${url}:`, error);
    throw error;
  }
}

export async function fetchSet(setCode) {
  const cards = getCachedCards(setCode);
  if (cards) return cards;

  let response = await fetchPage(
    `${SCRYFALL_API}/cards/search?order=set&q=e%3A${setCode}&unique=cards`,
  );

  let fullData = [];
  fullData.push(...response.data.map(normalizeCard));

  while (response.has_more) {
    await delay(500);
    response = await fetchPage(response.next_page);
    fullData.push(...response.data.map(normalizeCard));
  }

  setCache(setCode, fullData);

  return fullData;
}

export default fetchSet;
