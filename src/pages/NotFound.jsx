import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="center">
      <h2>404 — Nie znaleziono</h2>
      <Link to="/">Strona główna</Link>
    </div>
  );
}