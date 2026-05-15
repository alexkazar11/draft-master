import { useDraftContext } from "../../context/DraftProvider.jsx";
import DraftedCards from "./DraftedCards.jsx";
import PackDisplay from "./PackDisplay.jsx";

function DraftBoard() {
  const { state } = useDraftContext();

  if (!state) return <p className="draft-complete">Loading...</p>;

  if (state.draftComplete) {
    return (
      <div className="draft-board">
        <p className="draft-complete">Draft Complete</p>
        <DraftedCards />
      </div>
    );
  }

  return (
    <div className="draft-board">
      <div className="draft-stats">
        <span>Pack {state.currentRound + 1}</span>
        <span>Pick {state.currentPick + 1}</span>
      </div>
      <PackDisplay />
      <DraftedCards />
    </div>
  );
}

export default DraftBoard;
