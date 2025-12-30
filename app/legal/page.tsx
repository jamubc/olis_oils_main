import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Check the Small Print | Oli\'s Oils',
    description: 'Privacy policy, terms of service, and transparency information.',
};

export default function LegalPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24">
            <header className="mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">Small Print</h1>
                <p className="text-lg text-stone-600 font-sans max-w-2xl mx-auto">
                    Privacy, Terms, and Transparency.
                </p>
            </header>

            <div className="space-y-24">
                {/* Privacy Policy Section */}
                <section id="privacy" className="scroll-mt-32">
                    <h2 className="text-2xl font-serif text-stone-800 mb-8 pb-4 border-b border-stone-200">
                        Privacy Policy
                    </h2>

                    <div className="space-y-8 text-stone-600 leading-relaxed">
                        <p>
                            At Oli's Oils, we respect your privacy as much as we respect the environment. We do not sell, trade, or otherwise transfer your personal information to outside parties.
                        </p>

                        <div>
                            <h3 className="text-lg font-bold text-stone-800 mb-2">What we collect:</h3>
                            <p>
                                We collect only what is necessary to process your order: your name, shipping address, and email. We use a secure third-party processor (Stripe) for payments, so we never see or store your credit card details.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-stone-800 mb-2">Cookies:</h3>
                            <p>
                                We use small digital cookies to remember what is in your cart and to help our store function smoothly. You can turn these off in your browser settings, though our cart may not work correctly without them.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Terms of Service Section */}
                <section id="terms" className="scroll-mt-32">
                    <h2 className="text-2xl font-serif text-stone-800 mb-8 pb-4 border-b border-stone-200">
                        Terms of Service
                    </h2>

                    <div className="space-y-8 text-stone-600 leading-relaxed">
                        <p>
                            By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms.
                        </p>

                        <div>
                            <h3 className="text-lg font-bold text-stone-800 mb-2">Products:</h3>
                            <p>
                                Our products are natural and made in small batches. While we strive for consistency, slight variations in color or scent may occur due to the natural ingredients (like Cedar extract or Jojoba).
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-stone-800 mb-2">Allergies:</h3>
                            <p>
                                Please review the ingredient list on each product page before use. If you have nut or seed allergies, consult your doctor before using oil-based products.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
