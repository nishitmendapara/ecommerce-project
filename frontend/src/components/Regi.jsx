import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

function Regi() {
  const [showPassword, setShowPassword] = useState(false);

  // ================= INITIAL VALUES =================
  const initialValues = {
    name: "",
    email: "",
    password: "",
    address: "",
    gender: "",
    terms: false,
  };

  // ================= VALIDATION =================
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name must be less than 30 characters")
      .required("Please enter your name"),

    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter your email"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be less than 20 characters")
      .matches(/[A-Z]/, "Password must contain one uppercase letter")
      .matches(/[a-z]/, "Password must contain one lowercase letter")
      .matches(/[0-9]/, "Password must contain one number")
      .required("Please enter your password"),

    address: Yup.string()
      .required("Please enter your address"),

    gender: Yup.string()
      .oneOf(["male", "female"], "Please select your gender")
      .required("Please select your gender"),

    terms: Yup.boolean().oneOf(
      [true],
      "You must accept Terms of Service and Privacy Policy"
    ),
  });

  // ================= FORMIK =================
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (values) => {
      console.log("Registration Data:", values);

      // API call can be added here
      // Example:
      //
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      console.log(data);
      navigate("/login")
    },
  });

  return (
    <div>
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

          {/* ================= LEFT SIDE ================= */}
          <div className="hidden md:flex relative bg-[#111827] text-white p-10 flex-col justify-between overflow-hidden">

            {/* Background Decoration */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>

            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>

            {/* Logo */}
            <div className="relative z-10">
              <h1 className="text-4xl font-black">
                Shop<span className="text-blue-500">Cart</span>
              </h1>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
              <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase">
                Join ShopCart
              </p>

              <h2 className="text-4xl font-bold leading-tight mt-3">
                Create your
                <br />
                account <span className="text-blue-500">today.</span>
              </h2>

              <p className="text-gray-400 mt-4 max-w-sm text-sm leading-6">
                Create an account to discover amazing products, track your
                orders and enjoy a personalized shopping experience.
              </p>

              {/* Benefits */}
              <div className="mt-7 space-y-4">

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                    ✓
                  </div>

                  <p className="text-sm text-gray-300">
                    Access thousands of products
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                    ✓
                  </div>

                  <p className="text-sm text-gray-300">
                    Track your orders easily
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                    ✓
                  </div>

                  <p className="text-sm text-gray-300">
                    Get personalized shopping
                  </p>
                </div>

              </div>
            </div>

            {/* Footer */}
            <p className="relative z-10 text-xs text-gray-600">
              © 2026 Shop Cart
            </p>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-sm">

              {/* Mobile Logo */}
              <div className="md:hidden text-center mb-6">
                <h1 className="text-3xl font-black">
                  SHOP<span className="text-blue-600"> CART</span>
                </h1>
              </div>

              {/* Heading */}
              <div className="mb-5">
                <p className="text-blue-600 text-xs font-bold tracking-wider">
                  CREATE ACCOUNT
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-1">
                  Get started
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                  Create your account to start shopping.
                </p>
              </div>

              {/* ================= FORM ================= */}
              <form onSubmit={formik.handleSubmit}>

                {/* ================= NAME ================= */}
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your full name"
                    className={`w-full h-11 px-4 rounded-xl border bg-gray-50 outline-none text-sm transition focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    }`}
                  />

                  {formik.touched.name && formik.errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.name}
                    </p>
                  )}
                </div>

                {/* ================= EMAIL ================= */}
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your email"
                    className={`w-full h-11 px-4 rounded-xl border bg-gray-50 outline-none text-sm transition focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    }`}
                  />

                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                {/* ================= PASSWORD ================= */}
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Create a password"
                      className={`w-full h-11 px-4 pr-16 rounded-xl border bg-gray-50 outline-none text-sm transition focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                        formik.touched.password && formik.errors.password
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                {/* ================= ADDRESS ================= */}
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your address"
                    rows="2"
                    className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none text-sm resize-none transition focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                      formik.touched.address && formik.errors.address
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    }`}
                  ></textarea>

                  {formik.touched.address && formik.errors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.address}
                    </p>
                  )}
                </div>

                {/* ================= GENDER ================= */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>

                  <div className="flex gap-3">

                    {/* Male */}
                    <label
                      className={`flex-1 h-10 flex items-center justify-center gap-2 rounded-xl border bg-gray-50 cursor-pointer hover:border-blue-400 transition ${
                        formik.touched.gender && formik.errors.gender
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formik.values.gender === "male"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="accent-blue-600"
                      />

                      <span className="text-sm text-gray-600">
                        Male
                      </span>
                    </label>

                    {/* Female */}
                    <label
                      className={`flex-1 h-10 flex items-center justify-center gap-2 rounded-xl border bg-gray-50 cursor-pointer hover:border-blue-400 transition ${
                        formik.touched.gender && formik.errors.gender
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formik.values.gender === "female"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="accent-blue-600"
                      />

                      <span className="text-sm text-gray-600">
                        Female
                      </span>
                    </label>

                  </div>

                  {formik.touched.gender && formik.errors.gender && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.gender}
                    </p>
                  )}
                </div>

                {/* ================= TERMS ================= */}
                <div className="flex items-start gap-2 mb-4">

                  <input
                    type="checkbox"
                    name="terms"
                    checked={formik.values.terms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-4 h-4 mt-0.5 accent-blue-600"
                  />

                  <div>
                    <p className="text-xs text-gray-500 leading-5">
                      I agree to{" "}
                      <button
                        type="button"
                        className="text-blue-600 font-medium"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="text-blue-600 font-medium"
                      >
                        Privacy Policy
                      </button>
                    </p>

                    {formik.touched.terms && formik.errors.terms && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.terms}
                      </p>
                    )}
                  </div>

                </div>

                {/* ================= REGISTER BUTTON ================= */}
                <button
                  type="submit"
                  className="
                    w-full
                    h-11
                    rounded-xl
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    font-semibold
                    text-sm
                    transition
                    shadow-lg
                    shadow-blue-600/20
                  "
                >
                  Create Account
                </button>

              </form>

              {/* ================= DIVIDER ================= */}
              <div className="flex items-center gap-3 my-4">
                <div className="h-px bg-gray-200 flex-1"></div>

                <span className="text-[11px] text-gray-400">
                  OR
                </span>

                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              {/* ================= LOGIN ================= */}
              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?

                <Link to="/login">
                <button
                  type="button"
                  className="
                    ml-1
                    text-blue-600
                    font-semibold
                    hover:text-blue-700
                  "
                >
                  Sign In
                </button>
                </Link>
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Regi;