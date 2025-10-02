import { Form, useLoaderData } from "react-router-dom";

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
              <button>Usuń</button>
            </Form>
          </li>
        ))}
      </ul>
      <p><b>Suma: {total} zł</b></p>
    </section>
  );
}