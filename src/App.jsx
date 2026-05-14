import useDraft from "./hooks/useDraft.js";

function App() {
  const { packs } = useDraft();

  const listPacks =
    packs &&
    packs.map((pack, i) => (
      <li key={i}>
        <h2>Pack: {i + 1}</h2>
        <ul>
          {pack.map((card, j) => (
            <li key={j}>
              {" "}
              {`Rarity: ${JSON.stringify(card.rarity)} // Name: ${JSON.stringify(card.name)}`}{" "}
            </li>
          ))}
        </ul>
      </li>
    ));

  return (
    <>
      <ul>{listPacks || "loading"}</ul>
    </>
  );
}

export default App;
