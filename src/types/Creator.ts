export type ProductToAddData = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
};

export type ProductsToAdd = {
    products: ProductToAddData[];
};

export type AddedProducts = {
    id: number;
    quantity: number;
}[];
