import { useDraftContext } from "../../context/DraftProvider.jsx";
import CardItem from "./CardItem.jsx";

function DraftedCards() {
  const { state } = useDraftContext();

  if (!state) return <p>Loading...</p>;

  const cardList = state.players[0].draftedCards.map((c, i) => (
    <CardItem key={`${c.id}-${i}`} card={c} />
  ));

  return (
    <>
      <h1>Drafted Cards: </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "1rem",
          fontSize: "1rem",
          flexWrap: "wrap",
        }}
      >
        {cardList}
      </div>
    </>
  );
}

export default DraftedCards;
