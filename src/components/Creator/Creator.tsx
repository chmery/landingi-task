import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddedProducts, ProductsToAdd, ProductToAddData } from "../../types/Creator";
import Heading from "../Heading/Heading";
import styles from "./Creator.module.css";
import ProductItem from "./ProductItem/ProductItem";

const Creator = () => {
    const navigate = useNavigate();

    const [productsToAdd, setProductsToAdd] = useState<ProductToAddData[] | null>(null);
    const [addedProducts, setAddedProducts] = useState<AddedProducts | []>([]);

    useEffect(() => {
        const getproductsToAdd = async () => {
            const res = await fetch("https://dummyjson.com/products?limit=10");
            const productsToAdd: ProductsToAdd = await res.json();
            setProductsToAdd(productsToAdd.products);
        };
        getproductsToAdd();
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

        if (res.ok) {
            console.log("succes!");
            navigate("/");
        }
    };

    return (
        <div className={styles.creator}>
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
