import { pickCard } from "./draftLogic.js";
import { NUM_PLAYERS } from "../config/draftConfig.js";
import { getPackIndex } from "./draftLogic.js";

export function pickBotCards(state) {
  let newState = state;

  for (let i = 1; i < NUM_PLAYERS; i++) {
    const packIndex = getPackIndex(
      i,
      newState.currentPick,
      newState.currentRound,
    );
    const pack = newState.packs[newState.currentRound][packIndex];
    if (!pack || pack.length === 0) return newState;
    const randomCardId = pack[Math.floor(Math.random() * pack.length)].id;
    newState = pickCard(newState, i, randomCardId);
  }

  return newState;
}
