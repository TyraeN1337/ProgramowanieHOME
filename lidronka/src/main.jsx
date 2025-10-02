import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  isRouteErrorResponse,
  useRouteError,
  redirect,
} from "react-router-dom";

import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Search from "./pages/Search.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const PRODUCTS = [
  { id: "1", name: "Piotrus Patryk", price: 0, description: "Dobry do pracy na wsi szczegolnie Leszczynskiej" },
  { id: "2", name: "Papier A4 na wnioski 255 kartek", price: 15, description: "W policji cie wszyscy pokochaja za to <3" },
  { id: "3", name: "Ufo", price: 5999999, description: "Na weekendowy wypad do UESEJ" },
  { id: "4", name: "Bilet do Kina", price: 18, description: "tzw. Wycieczka klasowa" },
];

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
async function fetchProducts() { await delay(150); return PRODUCTS; }
async function fetchProductById(id) {
  await delay(120);
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) throw new Response("Produkt nie znaleziony", { status: 404 });
  return p;
}

const KEY = "demo_cart";
const getCart = () => JSON.parse(localStorage.getItem(KEY) || "{}");
const saveCart = (c) => localStorage.setItem(KEY, JSON.stringify(c));
function addToCart(id) { const c = getCart(); c[id] = (c[id] || 0) + 1; saveCart(c); }
function removeFromCart(id) {
  const c = getCart(); if (!c[id]) return;
  c[id] -= 1; if (c[id] <= 0) delete c[id]; saveCart(c);
}
async function getCartDetailed() {
  const c = getCart();
  const prods = await fetchProducts();
  const items = Object.entries(c)
    .map(([id, qty]) => {
      const p = prods.find(x => x.id === id);
      return p ? { ...p, qty } : null;
    })
    .filter(Boolean);
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  return { items, total };
}
async function productsLoader() { return await fetchProducts(); }
async function productLoader({ params }) { return await fetchProductById(params.id); }
async function cartLoader() { return await getCartDetailed(); }
async function cartAction({ request }) {
  const fd = await request.formData();
  const op = fd.get("op");
  const id = fd.get("id");
  if (!id) throw new Response("Brak id produktu", { status: 400 });
  if (op === "add") addToCart(id);
  else if (op === "remove") removeFromCart(id);
  else throw new Response("Zła operacja", { status: 400 });
  return redirect("/cart");
}
function Login() {
  return (
    <section>
      <h2>Logowanie</h2>
      <button onClick={() => { localStorage.setItem("token", "demo-token"); window.location.assign("/admin"); }}>
        Zaloguj 
      </button>{" "}
      <button onClick={() => { localStorage.removeItem("token"); window.location.assign("/"); }}>
        Wyloguj
      </button>
    </section>
  );
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products />, loader: productsLoader },
      { path: "products/:id", element: <ProductDetails />, loader: productLoader },
      { path: "cart", element: <Cart />, loader: cartLoader, action: cartAction },
      { path: "search", element: <Search /> },
      { path: "login", element: <Login /> },
      { path: "admin", lazy: () => import("./pages/Admin.jsx") }, 
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
function RootError() {
  const err = useRouteError();
  if (isRouteErrorResponse(err)) {
    if (err.status === 404) return <ErrorPage />; 
    return (
      <div style={{ padding: 16 }}>
        <h2>Błąd {err.status}</h2>
        <p>{err.statusText || "Wystąpił błąd"}</p>
        <Link to="/">Strona główna</Link>
      </div>
    );
  }
  return (
    <div style={{ padding: 16 }}>
      <h2>Coś chyba no yes</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{String(err)}</pre>
      <Link to="/">Wróć</Link>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
<RouterProvider router={router} fallbackElement={<div style={{padding:16}}>Ładowanie…</div>} />
</React.StrictMode>
);