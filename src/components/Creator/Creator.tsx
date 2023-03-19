import { useEffect, useState } from "react";
import useModal from "../../hooks/useModal";
import { AddedProducts, ProductsToAdd, ProductToAddData } from "../../types/Creator";
import Heading from "../Heading/Heading";
import Modal from "../Modal/Modal";
import styles from "./Creator.module.css";
import ProductItem from "./ProductItem/ProductItem";

const Creator = () => {
    const {
        isErrorModalOpen,
        isSuccesModalOpen,
        isClosing,
        setIsErrorModalOpen,
        setIsSuccesModalOpen,
        setIsClosing,
    } = useModal();

    const [productsToAdd, setProductsToAdd] = useState<ProductToAddData[] | null>(null);
    const [addedProducts, setAddedProducts] = useState<AddedProducts | []>([]);

    useEffect(() => {
        const getProductsToAdd = async () => {
            const res = await fetch("https://dummyjson.com/products?limit=10");
            const productsToAdd: ProductsToAdd = await res.json();
            setProductsToAdd(productsToAdd.products);
        };
        getProductsToAdd();
    }, []);

    const addProductHandler = (id: number, quantity: number) => {
        const addedProductIndex = addedProducts.findIndex((product) => product.id === id);

        if (addedProductIndex === -1) {
            setAddedProducts((prevState) => [...prevState, { id, quantity }]);
        } else {
            const updatedAddedProducts = [...addedProducts];
            updatedAddedProducts[addedProductIndex].quantity++;
            setAddedProducts(updatedAddedProducts);
        }
    };

    const removeProductHandler = (id: number) => {
        const productToRemoveIndex = addedProducts.findIndex((product) => product.id === id);

        let updatedAddedProducts = [...addedProducts];
        updatedAddedProducts[productToRemoveIndex].quantity--;

        if (updatedAddedProducts[productToRemoveIndex].quantity === 0)
            updatedAddedProducts = updatedAddedProducts.filter((product) => product.id !== id);

        setAddedProducts(updatedAddedProducts);
    };

    const createCartHandler = async () => {
        const res = await fetch("https://dummyjson.com/carts/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 1,
                products: addedProducts,
            }),
        });

        res.ok ? setIsSuccesModalOpen(true) : setIsErrorModalOpen(true);
    };

    return (
        <div className={styles.creator}>
            {isSuccesModalOpen && (
                <Modal
                    setIsClosing={setIsClosing}
                    isClosing={isClosing}
                    title="Succes!"
                    text="Cart has been successfully created."
                    type="succes"
                />
            )}
            {isErrorModalOpen && (
                <Modal
                    setIsClosing={setIsClosing}
                    isClosing={isClosing}
                    title="Error!"
                    text="The shopping cart could not be created"
                    type="error"
                />
            )}
            <Heading title="Cart creator" text="Create a new cart by adding items to it." />
            {productsToAdd && (
                <>
                    <div className={styles["products-list"]}>
                        {productsToAdd.map((product) => (
                            <ProductItem
                                productData={product}
                                onAdd={addProductHandler}
                                onRemove={removeProductHandler}
                                key={product.id}
                            />
                        ))}
                    </div>
                    <button
                        className={styles["create-btn"]}
                        onClick={createCartHandler}
                        disabled={!addedProducts.length ? true : false}
                    >
                        Create
                    </button>
                </>
            )}
        </div>
    );
};

export default Creator;
