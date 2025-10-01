import { Form, redirect, useLoaderData } from "react-router-dom";
import { addToCart, removeFromCart, getCartDetailed } from "../api";

export async function cartLoader() {
  return await getCartDetailed();
}

export async function cartAction({ request }) {
  const fd = await request.formData();
  const op = fd.get("op");
  const id = fd.get("id");
  if (!id) throw new Response("Brak id produktu", { status: 400 });

  if (op === "add") addToCart(id);
  else if (op === "remove") removeFromCart(id);
  else throw new Response("Nieznana operacja", { status: 400 });

  return redirect("/cart");
}

export default function Cart() {
  const { items, total } = useLoaderData();

  if (!items.length) return <p>Koszyk jest pusty.</p>;

  return (
    <section>
      <h2>Koszyk</h2>
      <ul>
        {items.map((it) => (
          <li key={it.id} style={{ marginBottom: 8 }}>
            {it.name} — {it.price} zł × {it.qty}{" "}
            <Form method="post" style={{ display: "inline" }}>
              <input type="hidden" name="op" value="remove" />
              <input type="hidden" name="id" value={it.id} />
              <button>Usuń 1</button>
            </Form>
          </li>
        ))}
      </ul>
      <p><b>Suma: {total} zł</b></p>
    </section>
  );
}