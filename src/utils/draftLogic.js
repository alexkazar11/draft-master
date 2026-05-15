import { NUM_PLAYERS } from "../config/draftConfig.js";

export function createInitialState(packs) {
  let gameState = {
    currentRound: 0,
    currentPick: 0,
    players: Array.from({ length: NUM_PLAYERS }, () => ({ draftedCards: [] })),
    packs: packs,
  };

  return gameState;
}

export function pickCard(state, playerIndex, cardId) {
  const { currentRound, currentPick } = state;
  const packIndex = (playerIndex + currentPick) % NUM_PLAYERS;
  const currentPack = state.packs[currentRound][packIndex];
  const card = currentPack.find((c) => c.id === cardId);

  return {
    ...state,
    players: state.players.map((player, i) => {
      if (i !== playerIndex) return player;
      return {
        ...player,
        draftedCards: [...player.draftedCards, card],
      };
    }),
    packs: state.packs.map((round, i) => {
      if (i !== currentRound) return round;
      return round.map((pack, j) => {
        if (j !== packIndex) return pack;
        return pack.filter((c) => c.id !== cardId);
      });
    }),
  };
}
