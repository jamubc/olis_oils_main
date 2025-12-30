import { reviews } from "@/lib/reviews";
import { Star } from "lucide-react";

export const metadata = {
    title: "Reviews | Oli's Oils",
    description: "Customer reviews for Oli's Oils natural skincare products.",
};

export default function ReviewsPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="font-serif text-3xl text-stone-800 mb-8 text-center">
                Customer Reviews
            </h1>

            <div className="space-y-6">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white p-6 rounded-lg border border-stone-200"
                    >
                        <div className="flex items-center gap-1 mb-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < review.rating
                                            ? "fill-amber-400 text-amber-400"
                                            : "text-stone-300"
                                        }`}
                                />
                            ))}
                        </div>

                        <p className="text-stone-600 mb-4">{review.text}</p>

                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-stone-800">{review.author}</span>
                            <span className="text-stone-500">{review.product}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
