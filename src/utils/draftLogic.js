import { NUM_PLAYERS, PACK_SIZE, NUM_PACKS } from "../config/draftConfig.js";
import { pickBotCards } from "./botLogic.js";

export function createInitialState(packs) {
  let state = {
    currentRound: 0,
    currentPick: 0,
    players: Array.from({ length: NUM_PLAYERS }, () => ({ draftedCards: [] })),
    packs: packs,
    draftComplete: false,
  };

  return state;
}

function advancePick(state) {
  const { currentRound, currentPick } = state;
  const isLastPick = currentPick >= PACK_SIZE - 1;
  const isLastRound = currentRound >= NUM_PACKS - 1;

  if (!isLastPick) {
    return { ...state, currentPick: currentPick + 1 };
  }

  if (!isLastRound) {
    return { ...state, currentPick: 0, currentRound: currentRound + 1 };
  }

  return { ...state, draftComplete: true };
}

export function getPackIndex(playerIndex, currentPick, currentRound) {
  const normalizedPick = currentPick % NUM_PLAYERS;
  return currentRound % 2 === 0
    ? (playerIndex + normalizedPick) % NUM_PLAYERS
    : (playerIndex - normalizedPick + NUM_PLAYERS) % NUM_PLAYERS;
}

export function confirmPick(state, cardId) {
  if (state.draftComplete) return state;
  const stateAfterHuman = pickCard(state, 0, cardId);
  const stateAfterBots = pickBotCards(stateAfterHuman);
  const stateAfterAdvance = advancePick(stateAfterBots);
  return stateAfterAdvance;
}

export function pickCard(state, playerIndex, cardId) {
  const { currentRound, currentPick } = state;
  const packIndex = getPackIndex(playerIndex, currentPick, currentRound);
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
        const index = pack.findIndex((c) => c.id === cardId);
        return [...pack.slice(0, index), ...pack.slice(index + 1)];
      });
    }),
  };
}
