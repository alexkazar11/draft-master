import useDraft from "./hooks/useDraft.js";

function App() {
  const { gameState } = useDraft();

  if (!gameState) return <p>Loading...</p>;

  return <pre>{JSON.stringify(gameState, null, 2)}</pre>;
}

export default App;
