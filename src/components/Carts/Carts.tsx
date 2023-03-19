import { Outlet, useLoaderData } from "react-router-dom";
import { CartsData } from "../../types/Carts";
import Heading from "../Heading/Heading";
import CartItem from "./CartItem/CartItem";
import styles from "./Carts.module.css";

export const getCartsData = async () => {
    const res = await fetch("https://dummyjson.com/carts");
    if (!res.ok) throw new Error();
    return res.json();
};

const Carts = () => {
    const cartsData = useLoaderData() as CartsData;

    return (
        <div className={styles.carts}>
            <div>
                <Heading title="All carts" text="Click on the cart to see its details." />
                <div className={styles["carts-list"]}>
                    {cartsData &&
                        cartsData.carts.map((cart) => <CartItem cartData={cart} key={cart.id} />)}
                </div>
            </div>
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
};

export default Carts;
