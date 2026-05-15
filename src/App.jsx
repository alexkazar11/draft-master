import { DraftProvider } from "./context/DraftProvider.jsx";
import DraftBoard from "./components/DraftBoard/DraftBoard.jsx";

function App() {
  return (
    <DraftProvider setCode={"sos"}>
      <DraftBoard />
    </DraftProvider>
  );
}

export default App;
