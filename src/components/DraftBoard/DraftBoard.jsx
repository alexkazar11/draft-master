import { useDraftContext } from "../../context/DraftProvider.jsx";
import DraftedCards from "./DraftedCards.jsx";
import PackDisplay from "./PackDisplay.jsx";

function DraftBoard() {
  const { state } = useDraftContext();

  if (!state) return <p>Loading...</p>;

  return (
    <>
      {state.draftComplete ? (
        <p>Draft Finished! </p>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "4rem",
              fontSize: "2rem",
            }}
          >
            <p>{`Pack: ${state.currentRound + 1} `} </p>{" "}
            <p>{`Pick: ${state.currentPick + 1}`}</p>
          </div>
          <PackDisplay />
        </>
      )}
      <DraftedCards />
    </>
  );
}

export default DraftBoard;
