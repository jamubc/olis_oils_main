"use client";

import { useState } from "react";
import { products, Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductDrawer } from "@/components/ProductDrawer";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl text-[#333333] mb-4 leading-tight text-center">
          Deep nourishment, <span className="italic font-light">naturally</span>
        </h1>
        <p className="text-stone-500 text-sm tracking-widest uppercase font-sans mb-8 text-center">
          Premium oils for hair, skin, & beard
        </p>
        <p className="text-base text-stone-600 leading-[1.8] text-left">
          Many personal care products do more harm than good. Conventional soaps strip away your skin&apos;s natural oils, while artificial moisturizers offer only short-term relief, training your skin to rely on them instead of producing its own moisture.
        </p>
        <p className="text-base text-stone-600 leading-[1.8] text-left mt-4">
          Natural oils like olive and jojoba work differently. They nourish skin and hair at a deeper level, support the body&apos;s natural balance, and deliver lasting hydration without harmful additives. Simple, effective, and environmentally responsible.
        </p>
      </section>

      {/* Products Section */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl text-stone-800 mb-8 text-center font-bold">
          Our Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </section>

      {/* Product Drawer */}
      <ProductDrawer
        product={selectedProduct}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
