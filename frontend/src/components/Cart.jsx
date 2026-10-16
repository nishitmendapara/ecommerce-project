import { useEffect, useState } from "react";
import {
  FaHeart,
  FaMinus,
  FaPlus,
  FaTrash,
  FaShoppingBag,
  FaArrowRight,
  FaTag,
} from "react-icons/fa";
import { apiFetch, getImageUrl } from "../utils/api";
import { Link } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // GET CART FROM DATABASE
  const getCart = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch(
        "/getcart",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Invalid server response (HTTP ${response.status}). Check your cart API route.`
        );
      }

      // Handle an empty cart
      if (
        response.status === 404 &&
        data.message === "Cart not found"
      ) {
        setCartItems([]);
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch cart"
        );
      }

      // Backend response: { message, cart: { items: [...] } }
      const items = data.cart?.items || [];

      const formattedItems = items
        .filter((item) => item.product)
        .map((item) => ({
          id: item.product._id,
          name: item.product.name,
          category: item.product.category || "General",
          price: Number(item.product.price) || 0,
          quantity: Number(item.quantity) || 1,
          image: item.product.image || "",
        }));

      setCartItems(formattedItems);
    } catch (error) {
      console.error("Get Cart Error:", error);
      setError(error.message || "Failed to load your cart");
    } finally {
      setLoading(false);
    }
  };

  // LOAD CART ONLY WHEN THE PAGE FIRST OPENS
  useEffect(() => {
    getCart();
  }, []);

  // UPDATE QUANTITY WITHOUT RELOADING THE CART
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    // Remember the current quantity in case the request fails
    const previousItems = cartItems;

    // Update UI immediately for a smooth experience
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );

    try {
      const response = await apiFetch(
        "/updatecart",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: id,
            quantity,
          }),
        }
      );

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Invalid server response (HTTP ${response.status})`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update quantity"
        );
      }

      // No getCart() call here.
      // React state and totals already updated.
    } catch (error) {
      console.error("Update Cart Error:", error);

      // Restore previous UI if the database update fails
      setCartItems(previousItems);

      alert(error.message || "Failed to update quantity");
    }
  };

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {
    const item = cartItems.find(
      (item) => item.id === id
    );

    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {
    const item = cartItems.find(
      (item) => item.id === id
    );

    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  // REMOVE ITEM FROM DATABASE
  const removeItem = async (id) => {
    try {
      const response = await apiFetch(
        "/deletecart",
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: id,
          }),
        }
      );

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Invalid server response (HTTP ${response.status})`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to remove product"
        );
      }

      // Remove item from UI without refreshing the page
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Remove Cart Error:", error);
      alert(error.message || "Failed to remove product");
    }
  };

  // CALCULATIONS
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shipping =
    subtotal >= 3000 || subtotal === 0 ? 0 : 99;

  const discount = couponApplied
    ? Math.round(subtotal * 0.1)
    : 0;

  const total = subtotal + shipping - discount;

  // APPLY COUPON
  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SHOP10") {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code");
    }
  };

  return (
    <>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* LOADING */}
          {loading ? (
            <div className="py-16 text-center">
              <p className="text-sm font-medium text-slate-500">
                Loading your cart...
              </p>
            </div>
          ) : error ? (
            /* ERROR STATE */
            <div className="mx-auto max-w-xl py-12 text-center">
              <h2 className="text-2xl font-extrabold text-slate-900">
                Unable to load cart
              </h2>

              <p className="mt-3 text-sm text-slate-500">
                {error}
              </p>

              <button
                type="button"
                onClick={getCart}
                className="mt-7 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Try Again
              </button>
            </div>
          ) : cartItems.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-3">

              {/* CART ITEMS */}
              <div className="lg:col-span-2">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Cart Items
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {cartItems.reduce(
                        (sum, item) =>
                          sum + item.quantity,
                        0
                      )}{" "}
                      items in your cart
                    </p>
                  </div>

                  <FaShoppingBag className="text-2xl text-indigo-500" />
                </div>

                {/* ITEMS */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="group rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition duration-300 hover:shadow-lg sm:p-5"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                        {/* IMAGE */}
                        <div className="relative shrink-0 overflow-hidden rounded-2xl bg-slate-50">
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src =
                                "/placeholder.png";
                            }}
                            className="h-32 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-28 sm:w-28"
                          />
                        </div>

                        {/* PRODUCT INFO */}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                            {item.category}
                          </p>

                          <h3 className="mt-1 text-base font-bold text-slate-900">
                            {item.name}
                          </h3>

                          <p className="mt-2 text-lg font-extrabold text-slate-900">
                            ₹{item.price.toLocaleString("en-IN")}
                          </p>

                          <button
                            type="button"
                            className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-red-500"
                          >
                            <FaHeart />
                            Move to Wishlist
                          </button>
                        </div>

                        {/* QUANTITY + REMOVE */}
                        <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">

                          {/* QUANTITY */}
                          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50">
                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(item.id)
                              }
                              disabled={item.quantity <= 1}
                              className="flex h-10 w-10 items-center justify-center text-slate-500 transition hover:text-indigo-600 disabled:opacity-40"
                            >
                              <FaMinus className="text-xs" />
                            </button>

                            <span className="flex h-10 min-w-10 items-center justify-center border-x border-slate-200 bg-white px-3 text-sm font-bold text-slate-900">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(item.id)
                              }
                              className="flex h-10 w-10 items-center justify-center text-slate-500 transition hover:text-indigo-600"
                            >
                              <FaPlus className="text-xs" />
                            </button>
                          </div>

                          {/* REMOVE */}
                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.id)
                            }
                            className="flex items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-red-500"
                          >
                            <FaTrash />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CONTINUE SHOPPING */}
                <Link to="/Product">
                <button
                  type="button"
                  className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                  Continue Shopping
                </button>
                </Link>
              </div>

              {/* ORDER SUMMARY */}
              <div className="lg:col-span-1">
                <div className="sticky top-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100 sm:p-7">
                  <h2 className="text-xl font-bold text-slate-900">
                    Order Summary
                  </h2>

                  {/* COUPON */}
                  <div className="mt-6">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Have a coupon?
                    </label>

                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

                        <input
                          type="text"
                          value={coupon}
                          onChange={(e) =>
                            setCoupon(e.target.value)
                          }
                          placeholder="Coupon code"
                          disabled={couponApplied}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={applyCoupon}
                        disabled={couponApplied}
                        className="rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Apply
                      </button>
                    </div>

                    {couponApplied && (
                      <p className="mt-2 text-xs font-medium text-green-600">
                        Coupon SHOP10 applied successfully!
                      </p>
                    )}

                    <p className="mt-2 text-xs text-slate-400">
                      Try coupon: SHOP10
                    </p>
                  </div>

                  <div className="my-6 border-t border-slate-100" />

                  {/* PRICE DETAILS */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        Subtotal
                      </span>

                      <span className="font-semibold text-slate-900">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        Shipping
                      </span>

                      <span
                        className={`font-semibold ${
                          shipping === 0
                            ? "text-green-600"
                            : "text-slate-900"
                        }`}
                      >
                        {shipping === 0
                          ? "FREE"
                          : `₹${shipping}`}
                      </span>
                    </div>

                    {couponApplied && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">
                          Discount
                        </span>

                        <span className="font-semibold text-green-600">
                          -₹{discount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="my-6 border-t border-slate-100" />

                  {/* TOTAL */}
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-slate-900">
                      Total
                    </span>

                    <span className="text-2xl font-extrabold text-indigo-600">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* CHECKOUT */}
                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Please connect your checkout page."
                      )
                    }
                    className="group mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl"
                  >
                    Proceed to Checkout

                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* EMPTY CART */
            <div className="mx-auto max-w-xl py-12 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50">
                <FaShoppingBag className="text-3xl text-indigo-500" />
              </div>

              <h2 className="mt-7 text-2xl font-extrabold text-slate-900">
                Your cart is empty
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Looks like you haven't added anything to
                your cart yet. Explore our products and find
                something you love.
              </p>
              
              <Link to="/Product">
              <button
                type="button"
                className="mt-7 inline-flex items-center gap-3 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                Start Shopping
                <FaArrowRight className="text-xs" />
              </button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Cart;