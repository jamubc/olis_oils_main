export interface Review {
    id: string;
    author: string;
    rating: number;
    product: string;
    text: string;
}

export const reviews: Review[] = [
    {
        id: "review-1",
        author: "Clavicular",
        rating: 3,
        product: "Catnip Oil",
        text: "Its aight."
    },
    {
        id: "review-2",
        author: "PLACEHOLDER_NAME",
        rating: 4.2,
        product: "PLACEHOLDER_PRODUCT_NAME",
        text: "PLACEHOLDER_REVIEW_TEXT: This is another structural placeholder. Seller will replace with actual customer reviews."
    },
];
