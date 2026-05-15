/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext } from "react";
import useDraft from "../hooks/useDraft.js";

export const DraftContext = createContext(null);

export function DraftProvider({ children }) {
  const { gameState, dispatch } = useDraft();

  return (
    <DraftContext.Provider value={{ gameState, dispatch }}>
      {children}
    </DraftContext.Provider>
  );
}

export function useDraftContext() {
  return useContext(DraftContext);
}
