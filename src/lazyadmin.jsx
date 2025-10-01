import React from "react";
import { redirect } from "react-router-dom";

export async function loader() {
  const token = localStorage.getItem("token");
  if (!token) throw redirect("/login");
  return null;
}

export function Component() {
  return (
    <section>
      <h2>Admin</h2>
      <p>Tajny panel (lazy loaded).</p>
    </section>
  );
}