import { useReducer, useEffect } from "react";
import fetchSet from "../api/scryfall.js";
import generatePacks from "../utils/packGeneration.js";
import { createInitialState, pickCard } from "../utils/draftLogic.js";

function draftReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "PICK_CARD":
      return pickCard(state, 0, action.cardId);
    default:
      return state;
  }
}

function useDraft() {
  const [gameState, dispatch] = useReducer(draftReducer, null);

  useEffect(() => {
    fetchSet("sos").then((d) => {
      const packs = generatePacks(d);
      const initialState = createInitialState(packs);
      dispatch({ type: "INIT", payload: initialState });
    });
  }, []);

  return { gameState, dispatch };
}

export default useDraft;
