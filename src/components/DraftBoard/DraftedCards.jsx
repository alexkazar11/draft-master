import { useDraftContext } from "../../context/DraftProvider.jsx";
import CardItem from "./CardItem.jsx";

function DraftedCards() {
  const { state } = useDraftContext();

  if (!state) return null;

  if (state.players[0].draftedCards.length === 0) return null;

  const cardList = state.players[0].draftedCards.map((c, i) => (
    <CardItem key={`${c.id}-${i}`} card={c} />
  ));

  return (
    <div className="drafted-section">
      <h2>Drafted Cards</h2>
      <div className="drafted-grid">{cardList}</div>
    </div>
  );
}

export default DraftedCards;
