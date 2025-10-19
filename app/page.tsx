import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-black inline-flex items-center justify-center flex-wrap gap-3">
              the brands you{" "}
              <Image
                src="/heart-svgrepo-com 1.png"
                alt="heart"
                width={56}
                height={56}
                className="inline-block"
              />{" "}
              all in one place.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 font-medium">
              #1 🔌 for all your favourite brands.
            </p>
            <div className="flex justify-center">
              <Link
                href="/products"
                className="bg-[#6366f1] text-white px-10 py-4 rounded-lg font-semibold text-base hover:bg-[#5558e3] transition-all shadow-lg hover:shadow-xl"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - 2x3 Grid */}
      <section className="pt-8 pb-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {/* Quality */}
            <div className="flex gap-4 items-start">
              <div className="w-14 h-14 bg-[#6366f1] text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-black">Quality</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  All items are sourced from reliable sellers which we have
                  established concrete relationships with.
                </p>
              </div>
            </div>

            {/* Affordability */}
            <div className="flex gap-4 items-start">
              <div className="w-14 h-14 bg-[#6366f1] text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-black">
                  Affordability
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  When buying two or more items, we offer a 10% discount for all
                  customers. This coupled with our already fantastic prices make
                  our items affordable!
                </p>
              </div>
            </div>

            {/* Consignment */}
            <div className="flex gap-4 items-start">
              <div className="w-14 h-14 bg-[#6366f1] text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-black">
                  Consignment
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Let us take care of selling your items! Fill out our
                  consignment form to find out how you can get your items sold.
                </p>
              </div>
            </div>

            {/* Secure Payments */}
            <div className="flex gap-4 items-start">
              <div className="w-14 h-14 bg-[#6366f1] text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-black">
                  Secure Payments
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  You can use Revolut or Paypal or check out with Shopify for
                  your peace of mind.
                </p>
              </div>
            </div>

            {/* Tracked Delivery */}
            <div className="flex gap-4 items-start">
              <div className="w-14 h-14 bg-[#6366f1] text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-black">
                  Tracked Delivery
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  All our packages are sent via AnPost, RoyalMail or EMS with
                  tracked delivery.
                </p>
              </div>
            </div>

            {/* Low Price Guaranteed */}
            <div className="flex gap-4 items-start">
              <div className="w-14 h-14 bg-[#6366f1] text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-black">
                  Low Price Guarantee
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  We guarantee that our prices won't be beaten! If so, we
                  promise to match it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#6366f1] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Join Our Newsletter
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto text-lg">
            Subscribe to get special offers, free giveaways, and exclusive
            deals.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 font-medium placeholder:font-normal"
            />
            <button className="bg-white text-[#6366f1] px-7 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
