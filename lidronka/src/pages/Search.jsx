import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

const PRODUCTS = [
  { id: "1", name: "Piotrus Patryk", price: 0, description: "Dobry do pracy na wsi szczegolnie Leszczynskiej" },
  { id: "2", name: "Papier A4 na wnioski 255 kartek", price: 15, description: "W policji cie wszyscy pokochaja za to <3" },
  { id: "3", name: "Ufo", price: 5999999, description: "Na weekendowy wypad do UESEJ" },
  { id: "4", name: "Bilet do Kina", price: 18, description: "tzw. Wycieczka klasowa" },
];

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    const s = q.toLowerCase();
    setResults(PRODUCTS.filter(p => p.name.toLowerCase().includes(s)));
  }, [q]);

  function onSubmit(e) {
    e.preventDefault();
    const v = new FormData(e.currentTarget).get("q") || "";
    setParams(v ? { q: v } : {});
  }

  return (
    <section>
      <h2>Wyszukaj</h2>
      <form onSubmit={onSubmit}>
        <input name="q" defaultValue={q} placeholder="Szukaj produktu…" />{" "}
        <button>Szukaj</button>
      </form>
      <ul>
        {results.map((p) => (
          <li key={p.id}>
            <Link to={`/products/${p.id}`}>{p.name}</Link> — {p.price} zł
          </li>
        ))}
      </ul>
    </section>
  );
}