export type ProductData = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
};

export type CartData = {
    id: number;
    products: ProductData[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
};

export type CartsData = {
    carts: CartData[];
};
