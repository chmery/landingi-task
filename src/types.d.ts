declare module "*.module.css";

type ProductData = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
};

type CartData = {
    id: number;
    products: ProductData[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
};

type CartsData = {
    carts: CartData[];
};
