import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { SlateBackground } from "./SlateBackground";

export function Footer() {
    return (
        <footer className="relative pt-16 pb-12 mt-24 md:fixed md:bottom-0 md:left-0 md:w-full md:-z-10 text-stone-300 overflow-hidden">
            <SlateBackground />
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Shop */}
                    <div>
                        <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
                            Shop
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/"
                                    className="text-stone-400 hover:text-white text-sm transition-colors"
                                >
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-stone-400 hover:text-white text-sm transition-colors"
                                >
                                    Reviews
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Support */}
                    <div>
                        <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/support#shipping"
                                    className="text-stone-400 hover:text-white text-sm transition-colors"
                                >
                                    Shipping Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/support#returns"
                                    className="text-stone-400 hover:text-white text-sm transition-colors"
                                >
                                    Return Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/support#faq"
                                    className="text-stone-400 hover:text-white text-sm transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/support#contact"
                                    className="text-stone-400 hover:text-white text-sm transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Legal */}
                    <div>
                        <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/legal#terms"
                                    className="text-stone-400 hover:text-white text-sm transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/legal#privacy"
                                    className="text-stone-400 hover:text-white text-sm transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Connect */}
                    <div>
                        <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
                            Connect
                        </h3>
                        <div className="flex gap-4 mb-6">
                            <Link
                                href="#"
                                className="text-stone-400 hover:text-white transition-colors"
                            >
                                <Instagram size={20} />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link
                                href="#"
                                className="text-stone-400 hover:text-white transition-colors"
                            >
                                <Twitter size={20} />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                href="#"
                                className="text-stone-400 hover:text-white transition-colors"
                            >
                                <Facebook size={20} />
                                <span className="sr-only">Facebook</span>
                            </Link>
                        </div>
                        <div className="max-w-xs">
                            <p className="text-stone-400 text-sm mb-3">
                                Subscribe to receive updates, access to exclusive deals, and more.
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-stone-800 border border-stone-700 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-stone-500 text-stone-200 placeholder-stone-500"
                                />
                                <button className="bg-white text-stone-900 px-4 py-2 rounded text-sm hover:bg-stone-200 transition-colors font-medium">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-stone-500 text-xs">
                        © {new Date().getFullYear()} Oli&apos;s Oils. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {/* Payment icons could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
