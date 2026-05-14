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

export function confirmPick(state, cardId) {
  const { currentRound, currentPick } = state;
  const currentPack = state.packs[currentRound][currentPick];
  const card = currentPack.find((c) => c.id === cardId);

  return {
    ...state,
    currentPick: state.currentPick + 1,
    players: state.players.map((player, i) => {
      if (i !== 0) return player;
      return {
        ...player,
        draftedCards: [...player.draftedCards, card],
      };
    }),
    packs: state.packs.map((round, i) => {
      if (i !== currentRound) return round;
      return round.map((pack, j) => {
        if (j !== currentPick) return pack;
        return pack.filter((c) => c.id !== cardId);
      });
    }),
  };
}
