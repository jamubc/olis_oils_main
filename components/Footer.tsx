import Link from "next/link";
import Image from "next/image";
import { Instagram, Shield } from "lucide-react";
import { SlateBackground } from "./SlateBackground";

export function Footer() {
    return (
        <footer className="relative min-h-[450px] pt-16 pb-12 md:fixed md:bottom-0 md:left-0 md:w-full md:-z-10 text-stone-300 overflow-hidden">
            <SlateBackground />
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block cursor-pointer">
                            <Image
                                src="/handdrawn_footer_logo.jpg"
                                alt="Oli's Oils"
                                width={400}
                                height={150}
                                className="h-auto w-auto invert mix-blend-screen"
                            />
                        </Link>
                    </div>

                    {/* Column 2: Shop */}
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
                                    href="/reviews"
                                    className="text-stone-400 hover:text-white text-sm transition-colors"
                                >
                                    Reviews
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Care */}
                    <div>
                        <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
                            Customer Care
                        </h3>
                        <ul className="space-y-3">
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
                                    href="/support#shipping"
                                    className="text-stone-400 hover:text-white text-sm transition-colors"
                                >
                                    Shipping &amp; Returns
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
                            <li>
                                <Link
                                    href="/legal"
                                    className="text-stone-400 hover:text-white text-sm transition-colors"
                                >
                                    Privacy &amp; Terms
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Social */}
                    <div className="flex items-center justify-center">
                        <Link
                            href="https://www.instagram.com/olis.oils/"
                            className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <Instagram size={48} />
                            <span className="sr-only">Instagram</span>
                        </Link>
                    </div>
                </div>

                {/* Footer Bottom: Copyright & Trust Signals */}
                <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-stone-500 text-xs">
                        © {new Date().getFullYear()} Oli&apos;s Oils. All rights reserved.
                    </p>

                    {/* Payment Icons */}
                    <div className="flex items-center gap-3">
                        <span className="text-stone-500 text-xs mr-2">We accept:</span>
                        <div className="flex items-center gap-3 flex-wrap">
                            <Image src="/assets/Visa/Visa-flat.svg" alt="Visa" width={36} height={22} className="h-5 w-auto" />
                            <Image src="/assets/MasterCard/MasterCard-flat.svg" alt="Mastercard" width={36} height={22} className="h-5 w-auto" />
                            <Image src="/assets/AmericanExpress/AmericanExpress-flat.svg" alt="American Express" width={36} height={22} className="h-5 w-auto" />
                            <Image src="/assets/Apple/Apple-flat.svg" alt="Apple Pay" width={36} height={22} className="h-5 w-auto" />
                            <Image src="/assets/GoogleWallet/GoogleWallet-flat.svg" alt="Google Pay" width={36} height={22} className="h-5 w-auto" />
                            <Image src="/assets/UnionPay/UnionPay-flat.svg" alt="UnionPay" width={36} height={22} className="h-5 w-auto" />
                            <Image src="/assets/Discover/Discover-flat.svg" alt="Discover" width={36} height={22} className="h-5 w-auto" />
                        </div>
                        <div className="flex items-center gap-1 text-stone-500 text-xs ml-4 border-l border-stone-700 pl-4">
                            <Shield size={14} />
                            <span>SSL Secured</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
