import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductById, getAllProductIds } from "@/lib/products";
import { AddToCartButton } from "./AddToCartButton";

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    const ids = getAllProductIds();
    return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: ProductPageProps) {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
        return { title: "Product Not Found" };
    }

    return {
        title: `${product.name} | Oli's Oils`,
        description: product.description,
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
        notFound();
    }

    const formattedPrice = new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    }).format(product.price / 100);

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="aspect-square relative bg-stone-100 rounded-lg overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-center">
                    <h1 className="font-serif text-4xl text-stone-800 mb-4">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-2xl font-medium text-stone-800">
                            {formattedPrice}
                        </span>
                        <span className="text-stone-500">{product.size}</span>
                    </div>

                    <p className="text-stone-600 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="space-y-4 mb-8">
                        <div>
                            <h3 className="font-medium text-stone-800 mb-1">Ingredients</h3>
                            <p className="text-stone-600">{product.ingredients}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-stone-800 mb-1">Scent</h3>
                            <p className="text-stone-600">{product.scent}</p>
                        </div>
                    </div>

                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
}
