import { useState, useEffect } from "react";
import fetchSet from "./api/scryfall.js";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchSet("sos").then((d) => setData(d));
  }, []);

  return <p>{JSON.stringify(data)}</p>;
}
