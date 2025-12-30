"use client";

import { useShoppingCart } from "use-shopping-cart";
import type { Product } from "@/lib/products";

interface AddToCartButtonProps {
    product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addItem } = useShoppingCart();

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            currency: product.currency,
            image: product.image,
        });
    };

    return (
        <button
            onClick={handleAddToCart}
            className="w-full bg-stone-800 text-white py-4 px-8 rounded text-lg font-medium hover:bg-stone-700 transition-colors"
        >
            Add to Cart
        </button>
    );
}
