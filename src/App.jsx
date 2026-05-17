import { useState } from "react";
import { DraftProvider } from "./context/DraftProvider.jsx";
import DraftBoard from "./components/DraftBoard/DraftBoard.jsx";
import DraftSetup from "./components/DraftSetup/DraftSetup.jsx";

function App() {
  const [selectedSet, setSelectedSet] = useState(null);

  if (!selectedSet) {
    return <DraftSetup onStart={setSelectedSet} />;
  }

  return (
    <DraftProvider setCode={selectedSet.code}>
      <DraftBoard selectedSet={selectedSet} />
    </DraftProvider>
  );
}

export default App;
