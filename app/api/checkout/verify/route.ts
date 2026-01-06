import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
});

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            return NextResponse.json(
                { error: "Missing session_id", verified: false },
                { status: 400 }
            );
        }

        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Check if the payment was successful
        if (session.payment_status === "paid") {
            return NextResponse.json({
                verified: true,
                customerEmail: session.customer_details?.email,
            });
        }

        return NextResponse.json(
            { verified: false, status: session.payment_status },
            { status: 400 }
        );
    } catch (error) {
        console.error("Session verification error:", error);
        return NextResponse.json(
            { error: "Failed to verify session", verified: false },
            { status: 500 }
        );
    }
}
