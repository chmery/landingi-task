import styles from "./CartItem.module.css";

type Props = {
    cartData: CartData;
};

const CartItem = ({ cartData }: Props) => {
    return (
        <div className={styles.item}>
            <h4>Cart {cartData.id}</h4>
            <div className={styles.info}>
                <span>Total products:</span>
                <span>{cartData.totalProducts}</span>
            </div>
            <div className={styles.info}>
                <span>Total value:</span>
                <span>{cartData.total}</span>
            </div>
        </div>
    );
};

export default CartItem;
