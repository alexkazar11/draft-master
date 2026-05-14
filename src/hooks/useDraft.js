import { useState, useEffect } from "react";
import fetchSet from "../api/scryfall.js";
import generatePacks from "../utils/packGeneration.js";

function useDraft() {
  const [packs, setPacks] = useState(null);

  useEffect(() => {
    fetchSet("sos").then((d) => {
      setPacks(generatePacks(d));
    });
  }, []);

  return { packs };
}

export default useDraft;
