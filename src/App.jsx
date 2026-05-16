import { useState } from "react";
import { DraftProvider } from "./context/DraftProvider.jsx";
import DraftBoard from "./components/DraftBoard/DraftBoard.jsx";
import DraftSetup from "./components/DraftSetup/DraftSetup.jsx";

function App() {
  const [setCode, setSetCode] = useState(null);

  if (!setCode) {
    return <DraftSetup onStart={setSetCode} />;
  }

  return (
    <DraftProvider setCode={setCode}>
      <DraftBoard />
    </DraftProvider>
  );
}

export default App;
