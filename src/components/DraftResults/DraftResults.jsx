import { useDraftContext } from "../../context/DraftProvider.jsx";
import DraftedCards from "../DraftBoard/DraftedCards.jsx";

function DraftResults() {
  const { state } = useDraftContext();

  const coreTypes = [
    "Creature",
    "Instant",
    "Sorcery",
    "Artifact",
    "Enchantment",
    "Planeswalker",
    "Land",
  ];

  const cardStats = state.players[0].draftedCards.reduce((acc, card) => {
    const cardTypeSplit = card.type_line.split("//")[0].split(" — ");
    const cardType = cardTypeSplit[0];
    const cardSubTypes = cardTypeSplit[1]
      ? cardTypeSplit[1].trim().split(" ")
      : [];

    for (let type of coreTypes) {
      if (cardType.includes(type)) {
        acc[type] = acc[type] || { count: 0, subtypes: {} };
        acc[type].count += 1;

        for (let subType of cardSubTypes) {
          acc[type].subtypes[subType] = (acc[type].subtypes[subType] || 0) + 1;
        }
      }
    }

    return acc;
  }, {});

  return (
    <div className="results-layout">
      <DraftedCards variant="full" />
      <ul className="card-stats">
        {coreTypes
          .filter((type) => cardStats[type])
          .map((type, i) => (
            <li key={i}>
              {`${type}: ${cardStats[type].count}`}
              <ul>
                {Object.entries(cardStats[type].subtypes).map(
                  ([subType, count], j) => (
                    <li key={j}>{`${subType}: ${count}`}</li>
                  ),
                )}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DraftResults;
