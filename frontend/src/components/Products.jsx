import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch, getImageUrl } from "../utils/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH PRODUCTS =================

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiFetch("/getproducts", {
          method: "GET",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load products");
        }

        setProducts(data.products || []);
      } catch (err) {
        console.error("Get Products Error:", err);
        setError(
          err.message || "Something went wrong while loading products"
        );
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // ================= DISPLAY RATING =================

  const renderRating = (rating) => {
    const numericRating = Number(rating);

    if (!Number.isFinite(numericRating)) {
      return null;
    }

    // Keep the rating between 0 and 5
    const safeRating = Math.min(5, Math.max(0, numericRating));

    const fullStars = Math.floor(safeRating);
    const hasHalfStar = safeRating - fullStars >= 0.5;

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div
        className="mt-2 flex items-center gap-2"
        aria-label={`Rating ${safeRating.toFixed(1)} out of 5`}
      >
        <div className="flex items-center text-lg leading-none">
          {/* Full Stars */}
          {Array.from({ length: fullStars }, (_, index) => (
            <span key={`full-${index}`} className="text-yellow-400">
              ★
            </span>
          ))}

          {/* Half Star */}
          {hasHalfStar && (
            <span
              className="text-yellow-400"
              style={{
                background:
                  "linear-gradient(to right, #facc15 50%, #d1d5db 50%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ★
            </span>
          )}

          {/* Empty Stars */}
          {Array.from({ length: emptyStars }, (_, index) => (
            <span key={`empty-${index}`} className="text-gray-300">
              ★
            </span>
          ))}
        </div>

        <span className="text-sm font-semibold text-gray-700">
          {safeRating.toFixed(1)}
        </span>
      </div>
    );
  };

  // Show only the first 4 products on the Home page
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="bg-gray-50 px-4 py-15 md:px-10">

      {/* ================= HEADING ================= */}

      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold tracking-[3px] text-indigo-600">
            OUR PRODUCTS
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Featured Products
          </h2>

          <p className="mt-2 text-gray-500">
            Explore our latest collection
          </p>
        </div>

        <Link
          to="/Product"
          className="w-fit font-semibold text-indigo-600 transition hover:text-indigo-800"
        >
          View All →
        </Link>
      </div>

      {/* ================= LOADING ================= */}

      {loading && (
        <p className="py-10 text-center text-gray-500">
          Loading products...
        </p>
      )}

      {/* ================= ERROR ================= */}

      {!loading && error && (
        <div className="py-10 text-center">
          <p className="text-red-600">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-gray-900 px-5 py-2 text-white hover:bg-gray-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* ================= NO PRODUCTS ================= */}

      {!loading && !error && products.length === 0 && (
        <p className="py-10 text-center text-gray-500">
          No products available right now.
        </p>
      )}

      {/* ================= PRODUCT GRID ================= */}

      {!loading && !error && featuredProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* PRODUCT IMAGE */}

              <div className="relative h-72 overflow-hidden bg-gray-100">
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name || "Product"}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/placeholder.png";
                  }}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-bold text-white">
                  NEW
                </span>

                {/* WISHLIST BUTTON */}

                <button
                  type="button"
                  aria-label={`Add ${product.name} to wishlist`}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-gray-700 shadow-md transition hover:bg-gray-900 hover:text-white"
                >
                  ♡
                </button>
              </div>

              {/* PRODUCT DETAILS */}

              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {product.category || "General"}
                </p>

                <h3 className="mt-2 text-lg font-bold text-gray-900">
                  {product.name}
                </h3>

                {/* ACTUAL PRODUCT RATING */}

                {product.rating !== undefined &&
                product.rating !== null &&
                product.rating !== "" ? (
                  renderRating(product.rating)
                ) : (
                  <p className="mt-2 text-sm text-gray-400">
                    No rating available
                  </p>
                )}

                {/* PRICE AND PRODUCT LINK */}

                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className="text-xl font-bold text-gray-900">
                    ₹{product.price}
                  </p>

                  <Link
                    to={`/singleproduct/${product._id}`}
                    className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;
