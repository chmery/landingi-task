import { useEffect, useState } from "react";
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
            <div className={styles.heading}>
                <h3>All Carts</h3>
                <p>Click on the cart to see its details</p>
            </div>
            <div className={styles["carts-list"]}>
                {cartsData && cartsData.carts.map((cart) => <CartItem cartData={cart} />)}
            </div>
        </div>
    );
};

export default Carts;
