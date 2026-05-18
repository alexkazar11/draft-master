import { fetchAllSets } from "../../api/scryfall.js";
import { useState, useEffect } from "react";

function DraftSetup({ onStart }) {
  const [allSets, setAllSets] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);

  useEffect(() => {
    fetchAllSets().then((sets) => {
      setAllSets(sets);
      setSelectedSet(sets[0]);
    });
  }, []);

  if (!allSets)
    return (
      <div className="draft-loading">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );

  function handleSelectChange(event) {
    const set = allSets.find((s) => s.code === event.target.value);
    setSelectedSet(set);
  }

  function handleSubmit() {
    onStart(selectedSet);
  }

  return (
    <div className="setup-page">
      {allSets && (
        <>
          <h1>MTG Draft Simulator</h1>
          <select value={selectedSet.code} onChange={handleSelectChange}>
            {allSets.map((set) => (
              <option key={set.id} value={set.code}>
                {`${set.name} (${set.code.toUpperCase()})`}
              </option>
            ))}
          </select>
          <button onClick={handleSubmit}>Start Draft</button>
        </>
      )}
    </div>
  );
}

export default DraftSetup;
