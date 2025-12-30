"use client";

import { useShoppingCart } from "use-shopping-cart";
import { useToast } from "@/components/ui/Toast";
import type { Product } from "@/lib/products";
import { useState } from "react";

interface AddToCartButtonProps {
    product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addItem } = useShoppingCart();
    const { showToast } = useToast();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            currency: product.currency,
            image: product.image,
        });
        showToast(product.name, { image: product.image });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full py-4 px-8 rounded text-lg font-medium transition-all duration-200 transform active:scale-95 ${isAdded
                    ? "bg-[#C5A059] text-white"
                    : "bg-stone-800 text-white hover:bg-stone-700"
                }`}
        >
            {isAdded ? "Added to Cart!" : "Add to Cart"}
        </button>
    );
}
