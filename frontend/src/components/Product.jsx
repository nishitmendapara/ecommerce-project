
import React, { useEffect, useState } from "react";
import {
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import { apiFetch } from "../utils/api";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [wishlist, setWishlist] = useState([]);

  const [error, setError] = useState("");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Shoes",
    "Accessories",
  ];

  // GET ALL PRODUCTS FROM DATABASE
  const getProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch(
        "/getproducts",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("Get Products Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to get products"
        );
      }

      setProducts(
        Array.isArray(data.products) ? data.products : []
      );
    } catch (error) {
      console.error("Get Products Error:", error);
      setError(
        error.message || "Something went wrong while getting products"
      );
    } finally {
      setLoading(false);
    }
  };

  // FETCH PRODUCTS WHEN PAGE LOADS
  useEffect(() => {
    getProducts();
  }, []);

  // ADD PRODUCT TO CART
  const handleAddCart = async (productId) => {
    try {
      const response = await apiFetch(
        "/cart",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: productId,
            quantity: 1,
          }),
        }
      );

      const data = await response.json();

      console.log("Add Cart Response:", data);

      if (!response.ok) {
        alert(data.message || "Failed to add product to cart");
        return;
      }

      alert(data.message || "Product added to cart successfully");
    } catch (error) {
      console.error("Add Cart Error:", error);
      alert("Something went wrong while adding product to cart");
    }
  };

  // WISHLIST
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // SEARCH AND CATEGORY FILTER
  let filteredProducts = products.filter((product) => {
    const productName = product.name || "";

    const matchesSearch = productName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  // SORT PRODUCTS
  if (sort === "low") {
    filteredProducts.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  }

  if (sort === "high") {
    filteredProducts.sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
  }

  if (sort === "rating") {
    filteredProducts.sort(
      (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
    );
  }

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-purple-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-indigo-500" />

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600">
                Shop Cart
              </span>

              <span className="h-px w-10 bg-indigo-500" />
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Explore our
              <span className="block bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                products.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500">
              Discover quality products from trusted brands and find
              everything you need in one place.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Search + Sort */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
            >
              <option value="default">Sort: Recommended</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Categories */}
          <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  category === item
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Product Count */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>
          </div>

          {/* LOADING STATE */}
          {loading ? (
            <div className="mt-16 py-16 text-center">
              <p className="text-sm font-medium text-slate-500">
                Loading products...
              </p>
            </div>
          ) : error ? (
            /* ERROR STATE */
            <div className="mt-16 rounded-3xl bg-slate-50 px-6 py-16 text-center">
              <h3 className="text-xl font-bold text-slate-900">
                Unable to load products
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {error}
              </p>

              <button
                type="button"
                onClick={getProducts}
                className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Try Again
              </button>
            </div>
          ) : filteredProducts.length > 0 ? (
            /* ================= PRODUCT GRID ================= */
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50">
                    <div className="flex h-60 items-center justify-center">
                      <img
                        src={
                          product.image
                            ? `http://localhost:5000/images/${encodeURIComponent(
                                product.image
                              )}`
                            : "/placeholder.png"
                        }
                        alt={product.name || "Product"}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder.png";
                        }}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Category Badge */}
                    <span className="absolute left-3 top-3 max-w-[65%] truncate rounded-full bg-white px-3 py-1.5 text-xs font-bold text-indigo-600 shadow-sm">
                      {product.category}
                    </span>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product._id)}
                      aria-label={
                        wishlist.includes(product._id)
                          ? `Remove ${product.name} from wishlist`
                          : `Add ${product.name} to wishlist`
                      }
                      aria-pressed={wishlist.includes(product._id)}
                      className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200 hover:scale-110 ${
                        wishlist.includes(product._id)
                          ? "text-red-500"
                          : "text-slate-400 hover:text-red-500"
                      }`}
                    >
                      <FaHeart />
                    </button>
                  </div>

                  {/* Product Information */}
                  <div className="px-2 pb-2 pt-5">
                    <h3 className="pb-2 text-base font-bold leading-6 text-slate-800 transition-colors group-hover:text-indigo-600">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-5 text-slate-500">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5">
                        <FaStar className="text-xs text-amber-500" />

                        <span className="text-sm font-bold text-slate-700">
                          {Number(product.rating || 0).toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2">
                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Price
                        </p>

                        <p className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">
                          ₹{Number(product.price || 0).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    {/* Add to Cart */}
                    <button
                      type="button"
                      onClick={() => handleAddCart(product._id)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-100 transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98]"
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="mt-16 rounded-3xl bg-slate-50 px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">
                <FaSearch className="text-xl text-indigo-600" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                No products found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try searching for a different product or category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setSort("default");
                }}
                className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Product;
