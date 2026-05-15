function CardItem({ card, onPick }) {
  return (
    <div className="card-item">
      <img src={card.image} alt={card.name} onClick={() => onPick?.(card.id)} />
    </div>
  );
}

export default CardItem;
