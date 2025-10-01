import { Form, useLoaderData } from "react-router-dom";
import { fetchProductById } from "../api";

export async function productLoader({ params }) {
  return await fetchProductById(params.id);
}

export default function ProductDetails() {
  const p = useLoaderData();

  return (
    <article>
      <h2>{p.name}</h2>
      <p>Cena: {p.price} zł</p>
      <p>{p.description}</p>
      <Form method="post" action="/cart">
        <input type="hidden" name="op" value="add" />
        <input type="hidden" name="id" value={p.id} />
        <button>Dodaj do koszyka</button>
      </Form>
    </article>
  );
}