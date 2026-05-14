import { NUM_PLAYERS } from "../config/draftConfig.js";

function createInitialState(packs) {
  let gameState = {
    currentRound: 0,
    currentPick: 0,
    players: Array.from({ length: NUM_PLAYERS }, () => ({ draftedCards: [] })),
    packs: packs,
  };

  return gameState;
}

export default createInitialState;
