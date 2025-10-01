import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import RootError from "./routes/RootError";
import Home from "./pages/Home";
import ProductsList, { productsLoader } from "./pages/ProductsList";
import ProductDetails, { productLoader } from "./pages/ProductDetails";
import Cart, { cartLoader, cartAction } from "./pages/Cart";
import Search from "./pages/Search";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
{
path: "/",
element: <RootLayout />,
errorElement: <RootError />,
children: [
{ index: true, element: <Home /> },
{ path: "products", element: <ProductsList />, loader: productsLoader },
{ path: "products/:id", element: <ProductDetails />, loader: productLoader },
{ path: "cart", element: <Cart />, loader: cartLoader, action: cartAction },
{ path: "search", element: <Search /> },
{ path: "login", element: <Login /> },
{ path: "admin", lazy: () => import("./pages/admin.route.jsx") },
{ path: "*", element: <NotFound /> },
],
},
]);
export default router;