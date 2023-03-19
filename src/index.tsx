import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Carts, { getCartsData } from "./components/Carts/Carts";
import CartDetails, { getCartDetails } from "./components/Carts/CartDetails/CartDetails";
import Creator from "./components/Creator/Creator";
import ErrorPage from "./components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "creator",
                element: <Creator />,
            },
            {
                path: "carts",
                element: <Carts />,
                loader: () => getCartsData(),
                children: [
                    {
                        path: "cart-details/:cartId",
                        element: <CartDetails />,
                        loader: ({ params }) => getCartDetails(params),
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
