import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchProducts } from "../api";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    let cancel = false;
    searchProducts(q).then((r) => !cancel && setResults(r));
    return () => { cancel = true; };
  }, [q]);

  function onSubmit(e) {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get("q") || "";
    setParams(value ? { q: value } : {});
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