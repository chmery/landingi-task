import { Link } from "react-router-dom";
import { CartData } from "../../../types/Carts";
import styles from "./CartItem.module.css";

type Props = {
    cartData: CartData;
};

const CartItem = ({ cartData }: Props) => {
    return (
        <Link to={`cart-details/${cartData.id}`} className={styles.item} data-testid="link">
            <h4>Cart {cartData.id}</h4>
            <div className={styles.info}>
                <span>Products:</span>
                <span>{cartData.totalProducts}</span>
            </div>
            <div className={styles.info}>
                <span>Value:</span>
                <span>{cartData.total}</span>
            </div>
        </Link>
    );
};

export default CartItem;
