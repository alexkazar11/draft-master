import { useDraftContext } from "../../context/DraftProvider.jsx";
import CardItem from "./CardItem.jsx";

function DraftedCards({ variant = "strip" }) {
  const { state } = useDraftContext();

  if (!state) return null;

  if (state.players[0].draftedCards.length === 0) return null;

  const cardList = state.players[0].draftedCards.map((c, i) => (
    <CardItem key={`${c.id}-${i}`} card={c} />
  ));

  return (
    <div
      className={`drafted-section ${variant === "full" ? "drafted-section--full" : ""}`}
    >
      <h2>Drafted Cards</h2>
      <div
        className={`drafted-grid ${variant === "full" ? "drafted-grid--full" : ""}`}
      >
        {cardList}
      </div>
    </div>
  );
}

export default DraftedCards;
