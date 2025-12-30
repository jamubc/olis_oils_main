import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
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
