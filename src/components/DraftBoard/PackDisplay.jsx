import { useDraftContext } from "../../context/DraftProvider.jsx";
import CardItem from "./CardItem.jsx";
import { getPackIndex } from "../../utils/draftLogic.js";

function PackDisplay() {
  const { state, dispatch } = useDraftContext();

  if (!state) return <p>Loading...</p>;

  const packIndex = getPackIndex(0, state.currentPick, state.currentRound);
  const cardList = state.packs[state.currentRound][packIndex].map((c, i) => (
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
