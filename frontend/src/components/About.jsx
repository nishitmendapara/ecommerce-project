import React from "react";
import { BiSolidShoppingBags } from "react-icons/bi";
import { FaHeart } from "react-icons/fa6";
import { IoIosRocket } from "react-icons/io";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-slate-50 py-15">
        {/* Background decoration */}
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-purple-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Small label */}
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-indigo-500"></span>

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600">
                About Shop Cart
              </span>

              <span className="h-px w-10 bg-indigo-500"></span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Shopping made
              <span className="block bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                simple & enjoyable.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Welcome to Shop Cart, your trusted online shopping destination.
              Discover quality products, explore your favorite brands, and enjoy
              a simple shopping experience all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ABOUT CONTENT ================= */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* LEFT CONTENT */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-indigo-500"></span>

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600">
                  Who We Are
                </span>
              </div>

              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Your shopping journey,
                <span className="block bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  our priority.
                </span>
              </h2>

              <p className="mt-6 text-base leading-7 text-slate-500">
                Shop Cart is an e-commerce platform created to make online
                shopping easy, convenient, and enjoyable. We bring different
                products and trusted brands together so you can find what you
                need without unnecessary complexity.
              </p>

              <p className="mt-4 text-base leading-7 text-slate-500">
                From discovering products to adding them to your cart and
                completing your purchase, we focus on creating a smooth
                experience for every customer.
              </p>

              {/* Features */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {/* Feature 1 */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="h-5 w-5 text-indigo-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9Z"
                      />
                    </svg>
                  </div>

                  <h3 className="font-bold text-slate-900">Quality Products</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Find products selected with quality and customer
                    satisfaction in mind.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="h-5 w-5 text-purple-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 10h18M7 15h.01M11 15h2M3 6h18v12H3V6Z"
                      />
                    </svg>
                  </div>

                  <h3 className="font-bold text-slate-900">Easy Shopping</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Browse, choose, add to cart, and shop with a simple
                    experience.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="h-5 w-5 text-indigo-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2Zm10-11V7a4 4 0 0 0-8 0v1h8Z"
                      />
                    </svg>
                  </div>

                  <h3 className="font-bold text-slate-900">
                    Secure Experience
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    We aim to provide a safe and trustworthy online shopping
                    environment.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="h-5 w-5 text-purple-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.125A2.25 2.25 0 0 1 17.38 19.75H6.62a2.25 2.25 0 0 1-2.245-2.125L3.75 7.5m16.5 0h-16.5m13.5 0V5.25A2.25 2.25 0 0 0 15.75 3h-7.5A2.25 2.25 0 0 0 6 5.25V7.5m9 4.5v3m-6-3v3"
                      />
                    </svg>
                  </div>

                  <h3 className="font-bold text-slate-900">
                    Convenient Orders
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    A smooth process from selecting products to completing your
                    order.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="relative">
              {/* Main card */}
              <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-indigo-600 to-purple-700 p-8 shadow-2xl shadow-indigo-200 sm:p-10">
                {/* Decorative circles */}
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/10"></div>
                <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-white/10"></div>

                <div className="relative">
                  {/* Cart icon */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.7}
                      stroke="currentColor"
                      className="h-8 w-8 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835L5.5 7.5m0 0 1.5 9h10.75l2-9H5.5Zm2.25 12.75a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm10 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
                      />
                    </svg>
                  </div>

                  <h3 className="mt-8 text-3xl font-extrabold text-white">
                    Shop Cart
                  </h3>

                  <p className="mt-4 leading-7 text-indigo-100">
                    Shop smart. Discover more. Enjoy a better online shopping
                    experience with everything you need in one place.
                  </p>

                  {/* Stats */}
                  <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/20 pt-7">
                    <div>
                      <p className="text-2xl font-bold text-white">100+</p>
                      <p className="mt-1 text-xs text-indigo-200">Products</p>
                    </div>

                    <div>
                      <p className="text-2xl font-bold text-white">50+</p>
                      <p className="mt-1 text-xs text-indigo-200">Brands</p>
                    </div>

                    <div>
                      <p className="text-2xl font-bold text-white">24/7</p>
                      <p className="mt-1 text-xs text-indigo-200">Shopping</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-13 -left-13 hidden rounded-2xl border border-white bg-white p-5 shadow-xl sm:block">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="h-6 w-6 text-indigo-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Shop With Confidence
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Simple & convenient
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600">
              Our Mission
            </span>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Making online shopping
              <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                better for everyone.
              </span>
            </h2>

            <p className="mt-6 text-base leading-7 text-slate-500">
              Our mission is to create a convenient online marketplace where
              customers can discover products, explore brands, and enjoy a
              smooth shopping experience.
            </p>
          </div>

          {/* Mission cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="group rounded-3xl bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 transition-colors duration-300 group-hover:bg-indigo-100">
                <span className="text-2xl text-indigo-500 transition-colors duration-300 group-hover:text-indigo-700">
                  <BiSolidShoppingBags />
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Easy Shopping
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Find what you need with a simple and user-friendly shopping
                experience.
              </p>
            </div>

            <div className="group rounded-3xl bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 transition-colors duration-300 group-hover:bg-pink-50">
                <span className="text-2xl text-indigo-500  transition-colors duration-300 group-hover:text-pink-500">
                  <FaHeart />
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Customer First
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                We focus on creating a shopping experience that customers enjoy.
              </p>
            </div>

            <div className="group rounded-3xl bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 transition-colors duration-300 group-hover:bg-indigo-100">
                <span className="text-2xl text-indigo-500 transition-colors duration-300 group-hover:text-indigo-700">
                  <IoIosRocket />
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Always Improving
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                We continuously improve Shop Cart to provide a better
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Ready to start shopping?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500">
            Explore our collection and discover products that fit your needs.
          </p>

          <Link to="/Product">
          <button
            type="button"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl"
          >
            Start Shopping
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default About;
