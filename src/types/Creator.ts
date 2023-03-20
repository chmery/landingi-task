export type ProductToAddData = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
};

export type ProductsToAdd = {
    products: ProductToAddData[];
};

export type AddedProducts = {
    id: number;
    quantity: number;
}[];
