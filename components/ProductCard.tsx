"use client";

import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import type { Product } from "@/lib/products";

interface ProductCardProps {
    product: Product;
    onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
    const { addItem } = useShoppingCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            currency: product.currency,
            image: product.image,
        });
    };

    const formattedPrice = new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    }).format(product.price / 100);

    return (
        <div
            className="group bg-white rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-stone-100 cursor-pointer overflow-hidden"
            onClick={onClick}
        >
            <div className="aspect-[3/4] relative bg-stone-50 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className="p-6 pt-8">
                <h3 className="text-2xl font-bold text-stone-800 mb-2 group-hover:text-stone-600 transition-colors">
                    {product.name}
                </h3>

                <p className="text-stone-500 text-sm mb-3">{product.size}</p>

                <div className="flex items-center justify-between">
                    <span
                        className="text-lg font-medium text-stone-600"
                        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                    >
                        {formattedPrice}
                    </span>

                    <button
                        onClick={handleAddToCart}
                        className="bg-stone-800 text-white px-4 py-2 rounded text-sm hover:bg-stone-700 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
