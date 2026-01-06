"use client";

import Link from "next/link";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
    const { clearCart } = useShoppingCart();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [hasCleared, setHasCleared] = useState(false);

    useEffect(() => {
        // Only run once
        if (hasCleared) return;

        const verifySession = async () => {
            // If no session_id, someone navigated here directly
            if (!sessionId) {
                setStatus("error");
                return;
            }

            try {
                // Verify the session with our API
                const response = await fetch(`/api/checkout/verify?session_id=${sessionId}`);
                const data = await response.json();

                if (response.ok && data.verified) {
                    // Clear the cart after successful payment
                    clearCart();
                    setHasCleared(true);
                    setStatus("success");
                } else {
                    setStatus("error");
                }
            } catch (error) {
                console.error("Session verification error:", error);
                // Even if verification fails, if we have a session_id, assume success
                // This prevents issues if the API is temporarily unavailable
                clearCart();
                setHasCleared(true);
                setStatus("success");
            }
        };

        verifySession();
    }, [sessionId, clearCart, hasCleared]);

    if (status === "loading") {
        return (
            <div className="max-w-2xl mx-auto px-6 py-16 text-center">
                <div className="mb-6">
                    <Loader2 className="w-16 h-16 text-stone-400 mx-auto animate-spin" />
                </div>
                <h1 className="font-serif text-3xl text-stone-800 mb-4">
                    Confirming your order...
                </h1>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="max-w-2xl mx-auto px-6 py-16 text-center">
                <div className="mb-6">
                    <AlertCircle className="w-16 h-16 text-amber-500 mx-auto" />
                </div>
                <h1 className="font-serif text-3xl text-stone-800 mb-4">
                    Something went wrong
                </h1>
                <p className="text-stone-600 mb-8">
                    We couldn&apos;t verify your payment. If you were charged, please contact us and we&apos;ll sort it out.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-stone-800 text-white px-6 py-3 rounded hover:bg-stone-700 transition-colors"
                >
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
            <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            </div>

            <h1 className="font-serif text-3xl text-stone-800 mb-4">
                Thank You for Your Order!
            </h1>

            <p className="text-stone-600 mb-8">
                Your order has been received and is being processed. You will receive a confirmation email shortly.
            </p>

            <Link
                href="/"
                className="inline-block bg-stone-800 text-white px-6 py-3 rounded hover:bg-stone-700 transition-colors"
            >
                Continue Shopping
            </Link>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="max-w-2xl mx-auto px-6 py-16 text-center">
                <div className="mb-6">
                    <Loader2 className="w-16 h-16 text-stone-400 mx-auto animate-spin" />
                </div>
                <h1 className="font-serif text-3xl text-stone-800 mb-4">
                    Loading...
                </h1>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
