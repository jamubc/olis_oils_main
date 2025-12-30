"use client";

import { CartProvider as USCProvider } from "use-shopping-cart";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

export function CartProvider({ children }: { children: React.ReactNode }) {
    return (
        <USCProvider
            mode="payment"
            cartMode="client-only"
            stripe={stripeKey}
            successUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/success?session_id={CHECKOUT_SESSION_ID}`}
            cancelUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/cart`}
            currency="CAD"
            shouldPersist={true}
        >
            {children}
        </USCProvider>
    );
}
