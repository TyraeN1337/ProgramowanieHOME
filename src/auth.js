import { redirect } from "react-router-dom";

export async function requireAuth() {
const token = localStorage.getItem("token");
if (!token) throw redirect("/login");
return null;
}