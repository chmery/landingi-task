import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../../Heading/Heading";
import Chart from "../Chart/Chart";
import styles from "./CartDetails.module.css";

const CartDetails = () => {
    const [cartData, setCartData] = useState<CartData | null>(null);
    const { cartId } = useParams();

    useEffect(() => {
        const getCartData = async () => {
            const res = await fetch(`https://dummyjson.com/carts/${cartId}`);
            const cartData: CartData = await res.json();
            setCartData(cartData);
        };
        getCartData();
    }, [cartId]);

    return (
        <div>
            {cartData && (
                <>
                    <div className={styles.details}>
                        <h3>Cart {cartData.id} details</h3>
                        <div>
                            <span>Products:</span>
                            <span>{cartData.totalProducts}</span>
                        </div>
                        <div>
                            <span>Total products:</span>
                            <span>{cartData.totalQuantity}</span>
                        </div>
                        <div>
                            <span>Value:</span>
                            <span>{cartData.total}</span>
                        </div>
                        <div>
                            <span>Discounted value:</span>
                            <span>{cartData.discountedTotal}</span>
                        </div>
                        <div>
                            <span>Difference:</span>
                            <span className={styles.difference}>
                                {cartData.total - cartData.discountedTotal}
                            </span>
                        </div>
                    </div>
                    <Heading title="Products chart" text="Detailed product pricing data." />
                    <Chart productsData={cartData.products} />
                </>
            )}
        </div>
    );
};

export default CartDetails;
