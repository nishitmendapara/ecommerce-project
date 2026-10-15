import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";


import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaEnvelope,
  FaPlus,
  FaList,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const [productOpen, setProductOpen] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      const response = await apiFetch("/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Backend logout failed");
      }
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      // Redirect to login whether the request succeeds or fails
      navigate("/login", { replace: true });
      setLoggingOut(false);
    }
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-gray-900 text-white shadow-lg">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-gray-700 px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-900/40">
          <FaShoppingCart className="text-xl text-white" />
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-wide text-white">
            Shop Cart
          </h1>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col overflow-y-auto p-4">
        <div>
          {/* Dashboard */}
          <Link
            to="/dash"
            className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-800"
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>

          {/* Product */}
          <button
            type="button"
            onClick={() => setProductOpen(!productOpen)}
            className="mb-2 flex w-full items-center justify-between rounded-lg px-4 py-3 transition hover:bg-gray-800"
          >
            <div className="flex items-center gap-3">
              <FaBox />
              <span>Product</span>
            </div>

            <FaChevronDown
              className={`transition-transform duration-300 ${
                productOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Product submenu */}
          {productOpen && (
            <div className="ml-4 space-y-1 border-l border-gray-700 pl-3">
              <Link
                to="/all-product"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-gray-800"
              >
                <FaList />
                <span>All Product</span>
              </Link>

              <Link
                to="/add-product"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-gray-800"
              >
                <FaPlus />
                <span>Add Product</span>
              </Link>
            </div>
          )}

          {/* Cart Products */}
          <Link
            to="/cart-products"
            className="mt-2 flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-800"
          >
            <FaShoppingCart />
            <span>Cart Products</span>
          </Link>

          {/* Contact Us */}
          <Link
            to="/contact-us"
            className="mt-2 flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-800"
          >
            <FaEnvelope />
            <span>Contact Us</span>
          </Link>

          {/* Users */}
          <Link
            to="/users"
            className="mt-2 flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-800"
          >
            <FaUsers />
            <span>Users</span>
          </Link>
        </div>

        {/* Logout at bottom */}
        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="group flex w-full items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400 transition-all duration-300 hover:border-red-500 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSignOutAlt className="text-lg transition-transform duration-300 group-hover:translate-x-1" />

            <span className="font-semibold tracking-wide">
              {loggingOut ? "Logging out..." : "Logout"}
            </span>
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
