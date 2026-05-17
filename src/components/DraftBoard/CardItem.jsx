import { useState } from "react";

function CardItem({ card, onPick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClick(event) {
    if (event.shiftKey) {
      setIsModalOpen(true);
    } else {
      onPick?.(card.id);
    }
  }

  return (
    <>
      {isModalOpen && (
        <div
          className="card-modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="card-modal">
            <img
              src={card.image}
              alt={card.name}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
      <div className="card-item">
        <img src={card.image} alt={card.name} onClick={handleClick} />
      </div>
    </>
  );
}

export default CardItem;
