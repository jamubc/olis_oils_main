import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Care & Support | Oli\'s Oils',
    description: 'Answers, shipping information, returns policy, and how to reach us.',
};

export default function SupportPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24">
            <header className="mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">Care & Support</h1>
                <p className="text-lg text-stone-600 font-sans max-w-2xl mx-auto">
                    Answers, shipping, and how to reach us.
                </p>
            </header>

            <div className="space-y-24">
                {/* FAQ Section */}
                <section id="faq" className="scroll-mt-32">
                    <h2 className="text-2xl font-serif text-stone-800 mb-8 pb-4 border-b border-stone-200">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-serif text-stone-800 mb-3">
                                Can I use these oils on my face and beard?
                            </h3>
                            <p className="text-stone-600 leading-relaxed">
                                Absolutely. Our products like <strong>Sapling</strong> and <strong>Blackbeard</strong> are designed to be versatile. Because we use natural carriers like Jojoba oil—which mimics the skin's natural sebum—they absorb quickly without clogging pores. They are excellent for softening beard hair, moisturizing the face, or taming split ends.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-serif text-stone-800 mb-3">
                                How long does a bottle last?
                            </h3>
                            <p className="text-stone-600 leading-relaxed">
                                A little goes a long way. For daily beard or face use, a 100ml bottle typically lasts 2–3 months.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-serif text-stone-800 mb-3">
                                Are your products scented?
                            </h3>
                            <p className="text-stone-600 leading-relaxed">
                                Yes, but only naturally. We use essential oils and infusions (like cedar extract and black spruce) to create our scents. We never use synthetic "parfum" or artificial fragrances that can irritate sensitive skin.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Shipping Policy Section */}
                <section id="shipping" className="scroll-mt-32">
                    <h2 className="text-2xl font-serif text-stone-800 mb-8 pb-4 border-b border-stone-200">
                        Shipping Policy
                    </h2>

                    <div className="bg-stone-100 p-8 rounded-lg mb-8">
                        <p className="text-stone-800 font-medium mb-4">
                            We ship all orders from our studio in Canada.
                        </p>
                        <ul className="space-y-3 text-stone-600 list-disc list-inside">
                            <li><strong className="text-stone-800">Processing Time:</strong> We hand-pack orders within 1–2 business days.</li>
                            <li><strong className="text-stone-800">Domestic Shipping (Canada):</strong> Standard shipping takes 3–7 business days.</li>
                            <li><strong className="text-stone-800">International:</strong> Yes, we ship globally. Delivery times vary by location (typically 7–14 business days).</li>
                        </ul>
                        <p className="text-sm text-stone-500 mt-6 italic">
                            Note: You will receive a tracking number via email as soon as your label is created.
                        </p>
                    </div>
                </section>

                {/* Returns Section */}
                <section id="returns" className="scroll-mt-32">
                    <h2 className="text-2xl font-serif text-stone-800 mb-8 pb-4 border-b border-stone-200">
                        Returns & The "Happy Skin" Guarantee
                    </h2>

                    <div className="text-stone-600 leading-relaxed space-y-4">
                        <p>
                            We believe in our oils, but we know everyone's skin is unique.
                        </p>
                        <p>
                            If you are not 100% satisfied with your bottle of Sapling, Blackbeard, or Cat Nip, please reach out to us within <strong>30 days</strong> of purchase. We will happily arrange a refund or help you swap it for a different blend that might suit you better.
                        </p>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="scroll-mt-32">
                    <h2 className="text-2xl font-serif text-stone-800 mb-8 pb-4 border-b border-stone-200">
                        Contact Us
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-stone-600 mb-6">
                                Have a question about which oil is right for you? Just want to say hello?
                            </p>
                            <div className="space-y-2">
                                <p className="text-stone-800">
                                    <span className="font-semibold block text-sm text-stone-500 uppercase tracking-wider mb-1">Email us</span>
                                    <a href="mailto:hello@olisoils.com" className="text-stone-900 border-b border-stone-300 hover:border-stone-900 transition-colors">
                                        hello@olisoils.com
                                    </a>
                                </p>
                                <p className="text-stone-800 mt-6">
                                    <span className="font-semibold block text-sm text-stone-500 uppercase tracking-wider mb-1">Studio Hours</span>
                                    Monday – Friday, 9am – 5pm EST
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
