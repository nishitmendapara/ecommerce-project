import React from "react";
import { Link } from "react-router-dom";
import { CiLocationOn, CiPhone} from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";

function Footer() {
  return (
    <div>
      <footer className="bg-gray-950 text-gray-300">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Shop<span className="text-indigo-500"> Cart</span>
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
                Your one-stop online store for quality products at the best
                prices. Shop with confidence and enjoy a simple shopping
                experience.
              </p>
              <div className="mt-6 flex gap-4">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:bg-indigo-600 hover:text-white"
                  aria-label="Facebook"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 8h3V4h-3c-3.31 0-6 2.69-6 6v2H5v4h3v8h4v-8h3l1-4h-4v-2c0-1.1.9-2 2-2z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:bg-pink-600 hover:text-white"
                  aria-label="Instagram"
                >
                  {/* Instagram */}
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <rect x={3} y={3} width={18} height={18} rx={5} />
                    <circle cx={12} cy={12} r={4} />
                    <circle cx="17.5" cy="6.5" r={1} />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:bg-sky-500 hover:text-white"
                  aria-label="Twitter"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:bg-blue-700 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7 0h3.83v2.2h.05c.53-1 1.83-2.7 3.77-2.7 4.03 0 4.78 2.65 4.78 6.1V24h-4v-9.18c0-2.19-.04-5-3.05-5-3.05 0-3.52 2.38-3.52 4.84V24h-4V8z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Quick Links
              </h3>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-sm transition hover:text-indigo-400"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-sm transition hover:text-indigo-400"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-sm transition hover:text-indigo-400"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm transition hover:text-indigo-400"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Customer Service
              </h3>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm transition hover:text-indigo-400"
                  >
                    My Account
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm transition hover:text-indigo-400"
                  >
                    My Orders
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm transition hover:text-indigo-400"
                  >
                    Shipping &amp; Delivery
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm transition hover:text-indigo-400"
                  >
                    Return Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Get In Touch
              </h3>
              <div className="mt-5 space-y-3 text-sm text-gray-400">
                <div className="flex ">
                  <CiLocationOn className="text-xl"/>
                  <div className="ps-2">123 Main Street, Gujarat, India</div>
                </div>
                <div className="flex ">
                  <CiPhone  className="text-xl"/>
                  <div className="ps-2">+91 98765 43210</div>
                </div>
                <div className="flex ">
                  <MdOutlineEmail  className="text-xl"/>
                  <div className="ps-2">support@shopease.com</div>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm font-medium text-white">
                  Subscribe to our newsletter
                </p>
                <form className="mt-3 flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="min-w-0 flex-1 rounded-l-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="rounded-r-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-8">
            <p className="text-sm text-gray-500">
              © 2026 ShopEase. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 transition hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 transition hover:text-white">
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
