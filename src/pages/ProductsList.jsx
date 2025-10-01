import { Link, Form, useLoaderData } from "react-router-dom";
import { fetchProducts } from "../api";

export async function productsLoader() {
  return await fetchProducts();
}

export default function ProductsList() {
  const products = useLoaderData();

  return (
    <section>
      <h2>Produkty</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: 8 }}>
            <Link to={`/products/${p.id}`}>{p.name}</Link> — {p.price} zł{" "}
            <Form method="post" action="/cart" style={{ display: "inline" }}>
              <input type="hidden" name="op" value="add" />
              <input type="hidden" name="id" value={p.id} />
              <button>Dodaj</button>
            </Form>
          </li>
        ))}
      </ul>
    </section>
  );
}