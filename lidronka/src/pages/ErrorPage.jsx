import { Link, useLocation } from "react-router-dom";

export default function ErrorPage() {
  const { pathname } = useLocation();
  return (
    <div style={{ padding: 16 }}>
      <h2>404 — Nie znaleziono</h2>
      <p>Adres „{pathname}” nie istnieje.</p>
      <p>
        <Link to="/">Strona główna</Link> • <Link to="/products">Produkty</Link>
      </p>
    </div>
  );
}