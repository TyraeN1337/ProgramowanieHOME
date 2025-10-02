import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";

export default function RootError() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="center">
        <h2>Błąd {error.status}</h2>
        <p>{error.statusText || "Wystąpił błąd"}</p>
        <Link to="/">Strona główna</Link>
      </div>
    );
  }

  return (
    <div className="center">
      <h2>Coś poszło nie tak</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{String(error)}</pre>
      <Link to="/">Wróć</Link>
    </div>
  );
}