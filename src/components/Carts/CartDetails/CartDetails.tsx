import { Params, useLoaderData } from "react-router-dom";
import { CartData } from "../../../types/Carts";
import Heading from "../../Heading/Heading";
import Chart from "../Chart/Chart";
import styles from "./CartDetails.module.css";

export const getCartDetails = async (params: Params<string>) => {
    const res = await fetch(`https://dummyjson.com/carts/${params.cartId}`);
    if (!res.ok) throw new Error();
    return res.json();
};

const CartDetails = () => {
    const cartData = useLoaderData() as CartData;

    return (
        <div>
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
        </div>
    );
};

export default CartDetails;
