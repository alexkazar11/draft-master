import { fetchAllSets } from "../../api/scryfall.js";
import { useState, useEffect } from "react";

function DraftSetup({ onStart }) {
  const [allSets, setAllSets] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);

  useEffect(() => {
    fetchAllSets().then((sets) => {
      setAllSets(sets);
      setSelectedSet(sets[0].code);
    });
  }, []);

  function handleSelectChange(event) {
    setSelectedSet(event.target.value);
  }

  function handleSubmit() {
    onStart(selectedSet);
  }

  return (
    <div className="setup-page">
      {allSets && (
        <>
          <select value={selectedSet} onChange={handleSelectChange}>
            {allSets.map((set) => (
              <option key={set.id} value={set.code}>
                {set.name}
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
