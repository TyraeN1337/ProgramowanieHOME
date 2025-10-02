import { NavLink, Outlet, useNavigation } from "react-router-dom";
import lidronkaLogo from "../logo/lidronka.png";


export default function Layout() {
const navigation = useNavigation();
const isPending = navigation.state === "loading" || navigation.state === "submitting";
const link = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

return (
<>
<header className="site-header">
<div className="wrapper nav-row">
<img 
  src={lidronkaLogo}
  alt="Logo sklepu" 
  style={{ width: "150px", height: "150px" }} 
/>
<nav className="navbar">
<NavLink to="/" end className={link}>Home</NavLink>
<NavLink to="/products" className={link}>Products</NavLink>
<NavLink to="/cart" className={link}>Cart</NavLink>
<NavLink to="/search" className={link}>Search</NavLink>
<NavLink to="/admin" className={link}>Admin</NavLink>
<NavLink to="/login" className={link}>Login</NavLink>
</nav>
</div>
</header>

  {isPending && <div className="topbar" role="progressbar" />}

  <main className="wrapper page">
    <Outlet />
  </main>

  <footer className="site-footer">
    <div className="wrapper">Jakub Szefik</div>
  </footer>
</>
);
}