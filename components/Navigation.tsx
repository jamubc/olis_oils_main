"use client";

import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { ShoppingBag } from "lucide-react";

export function Navigation() {
    const { cartCount } = useShoppingCart();

    return (
        <header className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
            <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-2xl font-serif font-medium text-stone-800 hover:text-stone-600 transition-colors"
                >
                    Oli&apos;s Oils
                </Link>

                <ul className="flex items-center gap-8">
                    <li>
                        <Link
                            href="/"
                            className="text-stone-600 hover:text-stone-900 transition-colors text-sm uppercase tracking-wide"
                        >
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/reviews"
                            className="text-stone-600 hover:text-stone-900 transition-colors text-sm uppercase tracking-wide"
                        >
                            Reviews
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/cart"
                            className="relative text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount && cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-stone-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
