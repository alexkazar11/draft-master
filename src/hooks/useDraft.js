import { useReducer, useEffect } from "react";
import fetchSet from "../api/scryfall.js";
import generatePacks from "../utils/packGeneration.js";
import { createInitialState, confirmPick } from "../utils/draftLogic.js";

function draftReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "PICK_CARD":
      return confirmPick(state, action.cardId);
    default:
      return state;
  }
}

function useDraft(setCode) {
  const [state, dispatch] = useReducer(draftReducer, null);

  useEffect(() => {
    fetchSet(setCode).then((d) => {
      const packs = generatePacks(d);
      const initialState = createInitialState(packs);
      dispatch({ type: "INIT", payload: initialState });
    });
  }, [setCode]);

  return { state, dispatch };
}

export default useDraft;
