function CardItem({ card, onPick }) {
  return (
    <img
      src={card.image}
      style={{ height: "250px", width: "auto", cursor: "pointer" }}
      onClick={() => onPick(card.id)}
    ></img>
  );
}

export default CardItem;
