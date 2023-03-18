import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Heading from "../Heading/Heading";
import CartItem from "./CartItem/CartItem";
import styles from "./Carts.module.css";

const Carts = () => {
    const [cartsData, setCartsData] = useState<CartsData | null>(null);

    useEffect(() => {
        const getCartsData = async () => {
            const res = await fetch("https://dummyjson.com/carts");
            const cartsData: CartsData = await res.json();

            setCartsData(cartsData);
        };
        getCartsData();
    }, []);

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
