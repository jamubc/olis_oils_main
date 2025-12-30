"use client";

import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
    const { cartCount } = useShoppingCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
            <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-stone-600 hover:text-stone-900"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X /> : <Menu />}
                </button>

                <Link
                    href="/"
                    className="text-2xl font-serif font-medium text-stone-800 hover:text-stone-600 transition-colors absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
                >
                    Oli&apos;s Oils
                </Link>

                <ul className="hidden md:flex items-center gap-8">
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

                {/* Mobile Cart Icon (Always Visible) */}
                <Link
                    href="/cart"
                    className="md:hidden relative text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1"
                >
                    <ShoppingBag className="w-5 h-5" />
                    {cartCount && cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-stone-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-stone-50 border-b border-stone-200 shadow-lg py-6 px-6 flex flex-col gap-6 animate-in slide-in-from-top-5">
                    <Link
                        href="/"
                        className="text-lg font-serif text-stone-800 hover:text-stone-600"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Our Products
                    </Link>
                    <Link
                        href="/reviews"
                        className="text-lg font-serif text-stone-800 hover:text-stone-600"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Reviews
                    </Link>
                    <Link
                        href="/cart"
                        className="text-lg font-serif text-stone-800 hover:text-stone-600"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Cart
                    </Link>
                </div>
            )}
        </header>
    );
}
