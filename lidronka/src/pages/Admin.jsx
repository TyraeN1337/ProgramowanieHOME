import { redirect } from "react-router-dom";

export async function loader() {
  const token = localStorage.getItem("token");
  if (!token) throw redirect("/login");
  return null;
}
export function Component() {
  return (
    <section>
      <h2>Panel administracyjny</h2>
      <p>Admin szefik</p>
    </section>
  );
}

export function ErrorBoundary() {
  return <div style={{ padding: 16 }}>Błąd w panelu admina.</div>;
}