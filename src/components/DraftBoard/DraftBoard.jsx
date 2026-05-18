import { useDraftContext } from "../../context/DraftProvider.jsx";
import DraftedCards from "./DraftedCards.jsx";
import PackDisplay from "./PackDisplay.jsx";
import DraftResults from "../DraftResults/DraftResults.jsx";

function DraftBoard({ selectedSet, onReset }) {
  const { state, error } = useDraftContext();

  if (error)
    return (
      <div className="draft-error-wrapper">
        <p className="draft-error">Failed to load set. Please try again.</p>
        <button className="btn" onClick={onReset}>
          New Draft
        </button>
      </div>
    );
  if (!state) return <p className="draft-complete">Loading...</p>;

  if (state.draftComplete) {
    return (
      <div className="draft-board">
        <div className="draft-complete-header">
          <p className="draft-complete">Draft Complete</p>
          <button className="btn" onClick={onReset}>
            New Draft
          </button>
        </div>

        <DraftResults />
      </div>
    );
  }

  return (
    <div className="draft-board">
      <div className="draft-stats">
        <span className="draft-stats__left helper-text">
          (Shift+Click to zoom)
        </span>
        <div className="draft-stats__centre">
          <span>{`${selectedSet.name} (${selectedSet.code.toUpperCase()})`}</span>
          <span>Pack {state.currentRound + 1}</span>
          <span>Pick {state.currentPick + 1}</span>
        </div>
        <div className="draft-stats__right">
          <button onClick={onReset}>New Draft</button>
        </div>
      </div>
      <PackDisplay />
      <DraftedCards />
    </div>
  );
}

export default DraftBoard;
