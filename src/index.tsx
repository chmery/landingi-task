import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Carts from "./components/Carts/Carts";
import CartDetails from "./components/Carts/CartDetails/CartDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "creator",
                element: <div>creator</div>,
            },
            {
                path: "carts",
                element: <Carts />,
                children: [
                    {
                        path: "cart-details/:cartId",
                        element: <CartDetails />,
                    },
                ],
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
