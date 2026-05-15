import { useDraftContext } from "./context/DraftProvider.jsx";

function App() {
  const { gameState, dispatch } = useDraftContext();

  if (!gameState) return <p>Loading...</p>;

  function handleTestPick() {
    const { currentRound, currentPick, draftComplete } = gameState;
    if (draftComplete) {
      alert("draft over");
      return;
    }
    const currentPack = gameState.packs[currentRound][(0 + currentPick) % 8];
    const firstCard = currentPack[0];
    dispatch({ type: "PICK_CARD", cardId: firstCard.id });
  }

  return (
    <>
      <button onClick={handleTestPick}>Test Pick</button>
      <pre>{JSON.stringify(gameState, null, 2)}</pre>
    </>
  );
}

export default App;
