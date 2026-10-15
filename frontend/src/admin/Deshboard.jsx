import React from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaPlus,
  FaList,
  FaUsers,
  FaShoppingCart,
  FaEnvelope,
  FaArrowRight,
  FaChartLine,
  FaStore,
} from "react-icons/fa";

function Dashboard() {
  return (
    <main className="ml-64 min-h-screen bg-slate-50 p-5 md:p-8">
      {/* ================= HEADER ================= */}
      <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Store Management
            </p>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
            Welcome to your Dashboard 
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500 md:text-base">
            Manage your products, customers and store activity from one
            convenient place.
          </p>
        </div>

        <Link
          to="/add-product"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl"
        >
          <FaPlus />
          Add New Product
        </Link>
      </header>

      {/* ================= WELCOME BANNER ================= */}
      <section className="relative mb-8 overflow-hidden rounded-3xl bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 p-7 text-white shadow-xl shadow-indigo-100 md:p-9">
        {/* Decorative circles */}
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-white/10"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
            <FaStore size={25} />
          </div>

          <h2 className="text-2xl font-bold md:text-3xl">
            Manage your store with ease
          </h2>

          <p className="mt-3 text-sm leading-6 text-indigo-100 md:text-base">
            Keep your products organized, monitor customers and stay updated
            with your store activity.
          </p>

          <Link
            to="/all-product"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-600 shadow-md transition hover:bg-indigo-50"
          >
            View All Products
            <FaArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ================= SUMMARY ================= */}
      <section className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Products */}
        <Link
          to="/all-product"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Product Management
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-800">
                Products
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Manage your complete product collection.
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
              <FaBoxOpen size={21} />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-indigo-600">
            Open products
            <FaArrowRight
              size={12}
              className="transition group-hover:translate-x-1"
            />
          </div>
        </Link>

        {/* Users */}
        <Link
          to="/users"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Customer Management
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-800">
                Customers
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                View and manage registered users.
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">
              <FaUsers size={21} />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-purple-600">
            View users
            <FaArrowRight
              size={12}
              className="transition group-hover:translate-x-1"
            />
          </div>
        </Link>

        {/* Activity */}
        <Link
          to="/cart-products"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Store Activity
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-800">
                Cart Activity
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Check products currently in customer carts.
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
              <FaShoppingCart size={21} />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-600">
            Check activity
            <FaArrowRight
              size={12}
              className="transition group-hover:translate-x-1"
            />
          </div>
        </Link>
      </section>

      {/* ================= MAIN ACTIONS ================= */}
      <section className="mb-8">
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Quick Actions
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-800">
            Product Management
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Quickly add products or browse your store inventory.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Add Product */}
          <Link
            to="/add-product"
            className="group relative overflow-hidden rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="absolute right-0 top-0 h-40 w-40 translate-x-16 -translate-y-16 rounded-full bg-violet-100 transition duration-300 group-hover:scale-150"></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                  <FaPlus size={24} />
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition group-hover:bg-violet-600 group-hover:text-white">
                  <FaArrowRight size={14} />
                </div>
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-800 transition group-hover:text-violet-600">
                Add Product
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Add a new product to your store with name, price, category,
                description and image.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-violet-600">
                Create new product
                <FaArrowRight
                  size={12}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </div>
          </Link>

          {/* All Products */}
          <Link
            to="/all-product"
            className="group relative overflow-hidden rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="absolute right-0 top-0 h-40 w-40 translate-x-16 -translate-y-16 rounded-full bg-blue-100 transition duration-300 group-hover:scale-150"></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                  <FaList size={24} />
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition group-hover:bg-blue-600 group-hover:text-white">
                  <FaArrowRight size={14} />
                </div>
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-800 transition group-hover:text-blue-600">
                All Products
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Browse your complete product collection and manage your store
                inventory.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                View product list
                <FaArrowRight
                  size={12}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ================= OTHER MANAGEMENT ================= */}
      <section>
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Store
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-800">
            Other Management
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage customers, cart activity and customer messages.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Users */}
          <Link
            to="/users"
            className="group flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
              <FaUsers size={22} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-slate-800 transition group-hover:text-purple-600">
                Users
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                View registered customer details.
              </p>
            </div>

            <FaArrowRight
              className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-purple-600"
              size={15}
            />
          </Link>

          {/* Cart */}
          <Link
            to="/cart-products"
            className="group flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
              <FaShoppingCart size={22} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-slate-800 transition group-hover:text-orange-600">
                Cart Products
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                View products currently in customer carts.
              </p>
            </div>

            <FaArrowRight
              className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-orange-600"
              size={15}
            />
          </Link>

          {/* Contact */}
          <Link
            to="/contact-us"
            className="group flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-pink-200 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
              <FaEnvelope size={22} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-slate-800 transition group-hover:text-pink-600">
                Contact Us
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Check messages sent by your customers.
              </p>
            </div>

            <FaArrowRight
              className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-pink-600"
              size={15}
            />
          </Link>

          {/* Store Overview */}
          <div className="flex items-center gap-5 rounded-2xl bg-linear-to-r from-slate-800 to-slate-900 p-5 text-white shadow-lg">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <FaChartLine size={22} />
            </div>

            <div>
              <h3 className="font-bold">Store Overview</h3>

              <p className="mt-1 text-sm text-slate-300">
                Keep your products and customers organized in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="mt-10 border-t border-slate-200 pt-5 text-center text-xs text-slate-400">
        Admin Dashboard · Store Management
      </footer>
    </main>
  );
}

export default Dashboard;