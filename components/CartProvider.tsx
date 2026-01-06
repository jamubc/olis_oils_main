"use client";

import { CartProvider as USCProvider } from "use-shopping-cart";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
const siteUrl = process.env.NEXT_PUBLIC_URL || "";

export function CartProvider({ children }: { children: React.ReactNode }) {
    return (
        <USCProvider
            mode="payment"
            cartMode="client-only"
            stripe={stripeKey}
            successUrl={`${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`}
            cancelUrl={`${siteUrl}/cart`}
            currency="CAD"
            shouldPersist={true}
        >
            {children}
        </USCProvider>
    );
}

