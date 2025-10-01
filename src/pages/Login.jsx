import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  return (
    <section>
      <h2>Logowanie</h2>
      <button onClick={() => { localStorage.setItem("token","demo-token"); nav("/admin"); }}>
        Zaloguj (demo)
      </button>{" "}
      <button onClick={() => { localStorage.removeItem("token"); nav("/"); }}>
        Wyloguj
      </button>
      <p>Wejście na /admin wymaga tokenu.</p>
    </section>
  );
}