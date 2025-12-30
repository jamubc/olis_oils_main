"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import type { Product } from "@/lib/products";
import { useEffect, useState } from "react";

interface ProductDrawerProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductDrawer({ product, isOpen, onClose }: ProductDrawerProps) {
    const { addItem } = useShoppingCart();
    const [isVisible, setIsVisible] = useState(false);

    // Handle animation timing
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = "hidden";
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Wait for transition
            document.body.style.overflow = "";
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    // Keep content available during closing animation
    if (!product && !isVisible) return null;

    const handleAddToCart = () => {
        if (!product) return;
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            currency: product.currency,
            image: product.image,
        });
    };

    const formattedPrice = product ? new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    }).format(product.price / 100) : "";

    return (
        <>
            {/* Backdrop with Blur */}
            <div
                className={`fixed inset-0 top-0 bg-stone-900/40 backdrop-blur-sm z-30 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-40 shadow-2xl transform transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1) pt-[65px] ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 transition-colors z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                {product && (
                    <div className="h-full flex flex-col">
                        {/* Header Image - Reduced Height */}
                        <div className="relative h-64 w-full bg-stone-50 flex-shrink-0">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-4"
                            />
                        </div>

                        {/* Content Scrollable Area */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-serif text-stone-800">{product.name}</h2>
                                <span className="text-xl font-medium text-stone-600 font-sans">
                                    {formattedPrice}
                                </span>
                            </div>

                            <p className="text-stone-600 leading-relaxed text-sm mb-6">
                                {product.description}
                            </p>

                            <div className="space-y-4 mb-8">
                                <div>
                                    <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wide mb-1">Ingredients</h3>
                                    <p className="text-stone-600 text-sm">{product.ingredients}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wide mb-1">Scent</h3>
                                    <p className="text-stone-600 text-sm">{product.scent}</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer - Always Visible Button */}
                        <div className="p-4 border-t border-stone-100 bg-white">
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-stone-800 text-white py-3 rounded text-base font-medium hover:bg-stone-700 transition-colors"
                            >
                                Add to Cart - {formattedPrice}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
