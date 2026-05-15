import { pickCard } from "./draftLogic.js";
import { NUM_PLAYERS } from "../config/draftConfig.js";

export function pickBotCards(state) {
  let newState = state;

  for (let i = 1; i < NUM_PLAYERS; i++) {
    const packIndex = (i + newState.currentPick) % NUM_PLAYERS;
    const pack = newState.packs[newState.currentRound][packIndex];
    const randomCardId = pack[Math.floor(Math.random() * pack.length)].id;
    newState = pickCard(newState, i, randomCardId);
  }

  return newState;
}
