import React, { useState } from "react";
import { IoMdCart, IoMdSearch} from "react-icons/io";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= MAIN NAVBAR ================= */}
        <div className="h-20 flex items-center justify-between">

          {/* ================= LEFT - LOGO ================= */}
          <div className="">

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Shop<span className="text-blue-600"> Cart</span>
            </h1>

          </div>


          {/* ================= MIDDLE - MENU ================= */}
          <div className="hidden lg:flex items-center gap-8">

            <Link
              to="/"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
            >
              About Us
            </Link>

            <Link
              to="/product"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
            >
              Products
            </Link>

            <Link
              to="/contact"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
            >
              Contact Us
            </Link>

          </div>


          {/* ================= RIGHT - ACTIONS ================= */}
          <div className="hidden lg:flex items-center gap-2">

            {/* Login */}
            <Link to="/login">
            <button
              className="
                px-4
                py-2
                text-sm
                font-semibold
                text-gray-700
                hover:text-blue-600
                transition
              "
            >
              Login
            </button>
            </Link>


            {/* Divider */}
            <div className="h-7 w-px bg-gray-200 mx-1"></div>


            {/* cart */}
            <Link to="cart">
            <button
              className="
                w-9
                h-9
                rounded-lg
                flex
                items-center
                justify-center
                text-gray-500
                hover:text-black
                hover:bg-sky-50
                transition
              "
              aria-label="cart"
            >
              <span className="text-sm font-bold">
                <IoMdCart className="text-xl"/>
              </span>
            </button>
            </Link>

          </div>


          {/* ================= MOBILE BUTTON ================= */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              lg:hidden
              w-10
              h-10
              rounded-xl
              border
              border-gray-200
              flex
              items-center
              justify-center
              text-gray-700
              hover:bg-gray-50
            "
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>


        {/* ================= MOBILE MENU ================= */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-5">

            {/* Navigation */}
            <div className="flex flex-col gap-1">

              <Link
                to="/"
                className="
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  font-semibold
                  text-blue-600
                  bg-blue-50
                "
              >
                Home
              </Link>

              <Link
                href="/about"
                className="
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  font-medium
                  text-gray-600
                  hover:bg-gray-50
                "
              >
                About Us
              </Link>

              <Link
                to="/product"
                className="
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  font-medium
                  text-gray-600
                  hover:bg-gray-50
                "
              >
                Products
              </Link>

              <Link
                to="/contact"
                className="
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  font-medium
                  text-gray-600
                  hover:bg-gray-50
                "
              >
                Contact Us
              </Link>

            </div>


            {/* Mobile Actions */}
            <div className="mt-4 pt-4 border-t border-gray-100">

              <div className="flex gap-3">
                <Link
                to="/login">
                <button
                  className="
                    flex-1
                    h-11
                    rounded-xl
                    border
                    border-gray-200
                    text-sm
                    font-semibold
                    text-gray-700
                    hover:bg-gray-50
                  "
                >
                  Login
                </button>
                </Link>

                <Link to="/register">
                <button
                  className="
                    flex-1
                    h-11
                    rounded-xl
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    text-sm
                    font-semibold
                  "
                >
                  Register
                </button>
                </Link>

              </div>


              {/* Social */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <Link to="cart">
                <button
                  className="
                    w-10
                    h-10
                    rounded-xl
                    ps-2.5
                    bg-gray-50
                    text-gray-500
                    hover:text-sky-500
                  "
                >
                  <IoMdCart className="text-xl"/>
                </button>
                </Link>

              </div>

            </div>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;