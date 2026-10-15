import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  // ================= VALIDATION =================

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter your email"),

    password: Yup.string().required("Please enter your password"),
  });

  // ================= NAVIGATE =================

  const navigate = useNavigate();

  // ================= FORMIK =================

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          credentials: "include",
          body: JSON.stringify(values),
        });

        const data = await response.json();

        console.log("Login Response:", data);

        if (!response.ok) {
          alert(data.message || "Login failed");
          return;
        }

        // Admin → Dashboard
        if (data.role === "admin") {
          navigate("/dash");
          return;
        }

        // User → Home
        if (data.role === "user") {
          navigate("/");
          return;
        }

        alert("Invalid user role");
      } catch (error) {
        console.log("Login Error:", error);
        alert("Something went wrong. Please try again.");
      }
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
              <h1 className="text-3xl font-black">
                Shop<span className="text-blue-500"> Cart</span>
              </h1>
            </div>

            {/* Content */}

            <div className="relative z-10">
              <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase">
                Welcome Back
              </p>

              <h2 className="text-4xl font-bold leading-tight mt-3">
                Your shopping
                <br />
                starts <span className="text-blue-500">here.</span>
              </h2>

              <p className="text-gray-400 mt-4 max-w-sm text-sm leading-6">
                Sign in to explore our latest products, manage your orders and
                enjoy a personalized shopping experience.
              </p>

              {/* Stats */}

              <div className="flex gap-8 mt-7">
                <div>
                  <h3 className="text-xl font-bold">10K+</h3>

                  <p className="text-gray-500 text-xs mt-1">Products</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold">5K+</h3>

                  <p className="text-gray-500 text-xs mt-1">Customers</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold">4.9★</h3>

                  <p className="text-gray-500 text-xs mt-1">Rating</p>
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
                  SHOP<span className="text-blue-600">CART</span>
                </h1>
              </div>

              {/* Heading */}

              <div className="mb-3">
                <p className="text-blue-600 text-xs font-bold tracking-wider">
                  ACCOUNT LOGIN
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-1">
                  Welcome back
                </h2>
              </div>

              {/* ================= FORM ================= */}

              <form onSubmit={formik.handleSubmit}>
                {/* ================= EMAIL ================= */}

                <div className="mb-4">
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
                    className={`
                      w-full
                      h-12
                      px-4
                      rounded-xl
                      border
                      bg-gray-50
                      outline-none
                      text-sm
                      transition
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-500/10
                      ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-500"
                          : "border-gray-200"
                      }
                    `}
                  />

                  {/* Email Error */}

                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                {/* ================= PASSWORD ================= */}

                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Password Input */}

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your password"
                      className={`
                        w-full
                        h-12
                        px-4
                        pr-16
                        rounded-xl
                        border
                        bg-gray-50
                        outline-none
                        text-sm
                        transition
                        focus:bg-white
                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-500/10
                        ${
                          formik.touched.password && formik.errors.password
                            ? "border-red-500"
                            : "border-gray-200"
                        }
                      `}
                    />

                    {/* Show / Hide Password */}

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        hover:text-gray-600
                        text-sm
                      "
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  {/* Password Error */}

                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                {/* ================= LOGIN BUTTON ================= */}

                <button
                  type="submit"
                  className="
                    w-full
                    h-12
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
                  Sign In
                </button>
              </form>

              {/* ================= DIVIDER ================= */}

              <div className="flex items-center gap-3 my-5">
                <div className="h-px bg-gray-200 flex-1"></div>

                <span className="text-[11px] text-gray-400">OR</span>

                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              {/* ================= GOOGLE ================= */}

              <button
                type="button"
                className="
                  w-full
                  h-12
                  border
                  border-gray-200
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-sm
                  font-medium
                  text-gray-700
                  hover:bg-gray-50
                  transition
                "
              >
                <span className="font-bold text-lg">G</span>
                Continue with Google
              </button>

              {/* ================= REGISTER ================= */}

              <p className="text-center text-sm text-gray-500 mt-5">
                Don't have an account?
                <Link
                  to="/register"
                  className="ml-1 text-blue-600 font-semibold hover:text-blue-700"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
