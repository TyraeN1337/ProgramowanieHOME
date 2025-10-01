import { NavLink, Outlet, useNavigation } from "react-router-dom";

export default function RootLayout() {
  const navigation = useNavigation();
  const isPending = navigation.state === "loading" || navigation.state === "submitting";

  return (
    <>
      <header>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/admin">Admin</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </header>

      {isPending && <div className="pending" aria-hidden />}

      <main>
        <Outlet />
      </main>

      <footer>© {new Date().getFullYear()} Demo Shop</footer>
    </>
  );
}