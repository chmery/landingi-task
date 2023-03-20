import { Params, useLoaderData } from "react-router-dom";
import useModal from "../../../hooks/useModal";
import { CartData } from "../../../types/Carts";
import Heading from "../../Heading/Heading";
import Modal from "../../Modal/Modal";
import Chart from "../Chart/Chart";
import styles from "./CartDetails.module.css";

export const getCartDetails = async (params: Params<string>) => {
    const res = await fetch(`https://dummyjson.com/carts/${params.cartId}`);
    if (!res.ok) throw new Error();
    return res.json();
};

const CartDetails = () => {
    const cartData = useLoaderData() as CartData;

    const {
        isErrorModalOpen,
        isSuccesModalOpen,
        isClosing,
        setIsErrorModalOpen,
        setIsSuccesModalOpen,
        setIsClosing,
    } = useModal();

    const removeCartHandler = async () => {
        const res = await fetch(`https://dummyjson.com/carts/${cartData.id}`, {
            method: "DELETE",
        });

        res.ok ? setIsSuccesModalOpen(true) : setIsErrorModalOpen(true);
    };

    return (
        <div>
            {isSuccesModalOpen && (
                <Modal
                    setIsClosing={setIsClosing}
                    isClosing={isClosing}
                    title="Succes!"
                    text="Cart has been successfully removed."
                    type="succes"
                />
            )}
            {isErrorModalOpen && (
                <Modal
                    setIsClosing={setIsClosing}
                    isClosing={isClosing}
                    title="Error!"
                    text="The shopping cart could not be removed"
                    type="error"
                />
            )}
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
            <button className={styles.button} onClick={removeCartHandler}>
                Remove cart
            </button>
        </div>
    );
};

export default CartDetails;
