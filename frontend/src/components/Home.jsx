import React from "react";
import SliderModule from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ban1 from "../assets/ban1.jpg";
import ban2 from "../assets/ban2.jpg";
import ban3 from "../assets/ban3.jpg";
import ban4 from "../assets/ban4.jpg";
import ban5 from "../assets/ban5.jpg";
import brand from "../assets/brand.jpg"

import Products from "./Products";
import Benefits from "./Benefits";
import Slide from "./Slide";
import { Link } from "react-router-dom";

const Slider = SliderModule.default;

function Home() {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className="position-absolute home-hero-slider">
        <Slider {...settings}>
          <div>
            <div>
              <img src={ban2} alt="image" />
            </div>
          </div>

          <div>
            <div>
              <img src={ban5} alt="image" />
            </div>
          </div>

          <div>
            <div>
              <img src={ban1} alt="image" />
            </div>
          </div>

          <div>
            <div>
              <img src={ban4} alt="image" />
            </div>
          </div>

          <div>
            <div>
              <img src={ban3} alt="image" />
            </div>
          </div>
        </Slider>
      </div>

      {/* -----products----- */}
      <Products />

      {/* -----benefits----- */}
      <Benefits />


      <section className="relative overflow-hidden bg-white py-20">
        {/* Background Decoration */}
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-purple-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* ================= LEFT IMAGE ================= */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-4xl shadow-2xl shadow-indigo-100">
                <img
                  src={brand}
                  alt="Premium brands"
                  className="h-112.5 w-full object-cover transition duration-700 hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-indigo-950/30 via-transparent to-transparent" />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-7 -right-5 hidden rounded-2xl border border-white/70 bg-white p-5 shadow-xl shadow-slate-200 sm:block">
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
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9Z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      100% Genuine
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Trusted products
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Circle */}
              <div className="absolute -left-5 -top-5 -z-10 h-24 w-24 rounded-full border-10 border-indigo-100" />
            </div>

            {/* ================= RIGHT CONTENT ================= */}
            <div>
              {/* Small Label */}
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-indigo-500" />

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600">
                  Premium Brands
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Discover brands
                <span className="block bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  you can trust.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-500">
                Shop from a carefully selected collection of trusted brands. We
                bring you quality products, genuine selections, and brands that
                customers love.
              </p>

              {/* Features */}
              <div className="mt-8 space-y-5">
                {/* Feature 1 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
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

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Authentic Products
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Shop confidently with genuine products from trusted
                      brands.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50">
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

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Premium Selection
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Discover popular and premium brands all in one place.
                    </p>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="mt-9">
                <Link to="/Product">
                <button
                  type="button"
                  className="group inline-flex items-center gap-3 rounded-full bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200"
                >
                  Explore Brands
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

              {/* Small Stats */}
              <div className="mt-10 flex flex-wrap gap-8 border-t border-slate-100 pt-7">
                <div>
                  <p className="text-2xl font-bold text-slate-900">50+</p>
                  <p className="mt-1 text-xs text-slate-400">Trusted Brands</p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-slate-900">10K+</p>
                  <p className="mt-1 text-xs text-slate-400">Happy Customers</p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-slate-900">100%</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Genuine Products
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -----slides----- */}
      <Slide />
    </>
  );
}

export default Home;
