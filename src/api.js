const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const PRODUCTS = [
  { id: "1", name: "Piotrus Patryk", price: 0, description: "Dobry do pracy na wsi szczegolnie Leszczynskiej" },
  { id: "2", name: "Papier A4 na wnioski 255 kartek", price: 15, description: "W policji cie wszyscy pokochaja za to <3" },
  { id: "3", name: "Ufo", price: 5999999, description: "Na weekendowy wypad do UESEJ" },
  { id: "4", name: "Bilet do Kina", price: 18, description: "tzw. Wycieczka klasowa" },
];

export async function fetchProducts() {
  await delay(300);
  return PRODUCTS;
}

export async function fetchProductById(id) {
  await delay(250);
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) throw new Response("Produkt nie znaleziony", { status: 404 });
  return p;
}

export async function searchProducts(q) {
  await delay(200);
  const s = (q || "").toLowerCase();
  return PRODUCTS.filter((p) => p.name.toLowerCase().includes(s));
}
const CART_KEY = "demo_cart";

export function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
  catch { return {}; }
}
export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
export function addToCart(id, qty = 1) {
  const c = getCart();
  c[id] = (c[id] || 0) + qty;
  saveCart(c);
  return c;
}
export function removeFromCart(id, qty = 1) {
  const c = getCart();
  if (!c[id]) return c;
  c[id] -= qty;
  if (c[id] <= 0) delete c[id];
  saveCart(c);
  return c;
}
export async function getCartDetailed() {
  const c = getCart();
  const prods = await fetchProducts();
  const items = Object.entries(c)
    .map(([id, qty]) => {
      const p = prods.find((x) => x.id === id);
      return p ? { ...p, qty } : null;
    })
    .filter(Boolean);
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  return { items, total };
}