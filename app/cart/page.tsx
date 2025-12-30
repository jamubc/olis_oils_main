"use client";

import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartPage() {
    const {
        cartDetails,
        cartCount,
        formattedTotalPrice,
        removeItem,
        incrementItem,
        decrementItem,
    } = useShoppingCart();

    const handleCheckout = async () => {
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cartDetails }),
            });

            const { url } = await response.json();

            if (url) {
                window.location.href = url;
            }
        } catch (error) {
            console.error("Checkout error:", error);
        }
    };

    if (!cartCount || cartCount === 0) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-16 text-center">
                <h1 className="font-serif text-3xl text-stone-800 mb-4">Your Cart</h1>
                <p className="text-stone-600 mb-8">Your cart is empty.</p>
                <Link
                    href="/"
                    className="inline-block bg-stone-800 text-white px-6 py-3 rounded hover:bg-stone-700 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="font-serif text-3xl text-stone-800 mb-8">Your Cart</h1>

            <div className="space-y-6">
                {Object.values(cartDetails ?? {}).map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 bg-white p-4 rounded-lg border border-stone-200"
                    >
                        {/* Product Image */}
                        <div className="w-full md:w-24 h-48 md:h-24 relative bg-stone-100 rounded overflow-hidden flex-shrink-0">
                            <Image
                                src={item.image || "/placeholder.jpg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow w-full md:w-auto">
                            <h3 className="font-serif text-lg text-stone-800">{item.name}</h3>
                            <p className="text-stone-600 md:hidden">{item.formattedPrice}</p> {/* Price below name on mobile */}
                            <p className="text-stone-600 hidden md:block">{item.formattedPrice}</p>
                        </div>

                        {/* Mobile: Controls Row (Quantity, Total, Remove) */}
                        <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-6">

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 border border-stone-200 rounded px-2 py-1 md:border-0 md:px-0 md:py-0">
                                <button
                                    onClick={() => decrementItem(item.id)}
                                    className="p-1 text-stone-600 hover:text-stone-800 transition-colors"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <button
                                    onClick={() => incrementItem(item.id)}
                                    className="p-1 text-stone-600 hover:text-stone-800 transition-colors"
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Total Price (Mobile & Desktop) */}
                            <div className="text-right min-w-[80px]">
                                <p className="font-medium text-stone-800">{item.formattedValue}</p>
                            </div>

                            {/* Remove Button */}
                            <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                                aria-label="Remove item"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-8 border-t border-stone-200">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-lg text-stone-600">Total</span>
                    <span className="text-2xl font-medium text-stone-800">
                        {formattedTotalPrice}
                    </span>
                </div>

                <button
                    onClick={handleCheckout}
                    className="w-full bg-stone-800 text-white py-4 px-8 rounded text-lg font-medium hover:bg-stone-700 transition-colors"
                >
                    Checkout
                </button>

                <Link
                    href="/"
                    className="block text-center mt-4 text-stone-600 hover:text-stone-800 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
