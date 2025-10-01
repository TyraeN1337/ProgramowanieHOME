import { redirect } from "react-router-dom";
import Admin from "./Admin"; 

export async function loader() {
  const token = localStorage.getItem("token");
  if (!token) throw redirect("/login");
  return null;
}

export function Component() {
  return <Admin />;
}

export function ErrorBoundary() {
  return <div className="center">Błąd w panelu admina.</div>;
}