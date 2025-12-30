import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
});

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface CartDetails {
    [key: string]: CartItem;
}

export async function POST(request: Request) {
    try {
        const { cartDetails } = await request.json() as { cartDetails: CartDetails };

        if (!cartDetails || Object.keys(cartDetails).length === 0) {
            return NextResponse.json(
                { error: "Cart is empty" },
                { status: 400 }
            );
        }

        const lineItems = Object.values(cartDetails).map((item) => ({
            price_data: {
                currency: "cad",
                product_data: {
                    name: item.name,
                    images: item.image ? [`${process.env.NEXT_PUBLIC_URL}${item.image}`] : [],
                },
                unit_amount: item.price,
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 }
        );
    }
}
