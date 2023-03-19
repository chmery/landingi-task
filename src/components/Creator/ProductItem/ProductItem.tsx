import { useState } from "react";
import { ProductToAddData } from "../../../types/Creator";
import { MinusIcon, PlusIcon } from "../../Icons/Icons";
import styles from "./ProductItem.module.css";

type Props = {
    productData: ProductToAddData;
    onRemove: (id: number) => void;
    onAdd: (id: number, quantity: number) => void;
};

const ProductItem = ({ productData, onAdd, onRemove }: Props) => {
    const [quantity, setQuantity] = useState(0);

    const addProductHandler = () => {
        if (quantity >= 10) return;
        setQuantity((prevState) => prevState + 1);
        onAdd(productData.id, quantity + 1);
    };

    const removeProductHandler = () => {
        if (quantity === 0) return;
        setQuantity((prevState) => prevState - 1);
        onRemove(productData.id);
    };

    return (
        <div className={styles["product-item"]}>
            <img src={productData.thumbnail} alt={productData.title} />
            <div className={styles.description}>
                <span className={styles.title}>{productData.title}</span>
                <span className={styles.price}>{`${productData.price}$`}</span>
            </div>
            <div className={styles.buttons}>
                <button className={styles["add-btn"]} onClick={addProductHandler}>
                    <PlusIcon />
                </button>
                <span>{quantity}</span>
                <button className={styles["remove-btn"]} onClick={removeProductHandler}>
                    <MinusIcon />
                </button>
            </div>
        </div>
    );
};

export default ProductItem;
