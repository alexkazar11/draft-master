import { useDraftContext } from "../../context/DraftProvider.jsx";
import { getPackIndex } from "../../utils/draftLogic.js";
import { RARITY_ORDER } from "../../config/draftConfig.js";
import CardItem from "./CardItem.jsx";

function PackDisplay() {
  const { state, dispatch } = useDraftContext();

  if (!state) return <p>Loading...</p>;

  const packIndex = getPackIndex(0, state.currentPick, state.currentRound);
  const cardList = [...state.packs[state.currentRound][packIndex]]
    .sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity])
    .map((c, i) => (
      <CardItem key={`${c.id}-${i}`} card={c} onPick={handlePick} />
    ));

  function handlePick(cardId) {
    dispatch({ type: "PICK_CARD", cardId });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "1rem",
        fontSize: "1rem",
        flexWrap: "wrap",
      }}
    >
      {cardList}
    </div>
  );
}
export default PackDisplay;
