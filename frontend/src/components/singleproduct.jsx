
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaStar,
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaBoxOpen,
} from "react-icons/fa";
import { apiFetch, getImageUrl } from "../utils/api";

function SingleProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // FETCH SINGLE PRODUCT
  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiFetch(`/singleproduct/${id}`, {
          method: "GET",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load product");
        }

        setProduct(data.product);
      } catch (err) {
        console.error("Get Single Product Error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getSingleProduct();
    }
  }, [id]);

  // CHANGE QUANTITY
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // ADD PRODUCT TO CART
  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setAddingToCart(true);
      setMessage("");

      const response = await apiFetch("/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: quantity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product to cart");
      }

      setMessage(data.message || "Product added to cart successfully!");
    } catch (err) {
      console.error("Add to Cart Error:", err);
      setMessage(err.message || "Unable to add product to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-500">Loading product...</p>
      </div>
    );
  }

  // ERROR
  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-6">
        <FaBoxOpen className="text-5xl text-gray-300" />

        <h2 className="text-xl font-bold text-gray-800">
          {error || "Product not found"}
        </h2>

        <Link
          to="/"
          className="rounded-lg bg-gray-900 px-5 py-3 text-white hover:bg-gray-800"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const rating = Number(product.rating);
  const validRating =
    Number.isFinite(rating) && rating >= 0 && rating <= 5;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* BACK BUTTON */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-gray-900"
        >
          <FaArrowLeft />
          Back to Products
        </Link>

        {/* SINGLE PRODUCT CARD */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:gap-12 md:p-10">
            {/* PRODUCT IMAGE */}
            <div className="flex min-h-80 items-center justify-center rounded-xl bg-gray-50 p-6">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/placeholder.png";
                }}
                className="max-h-105 w-full rounded-xl object-contain"
              />
            </div>

            {/* PRODUCT DETAILS */}
            <div className="flex flex-col justify-center">
              <span className="mb-4 w-fit rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
                {product.category}
              </span>

              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {product.name}
              </h1>

              {/* RATING */}
              <div className="mt-4 flex items-center gap-2">
                {validRating ? (
                  <>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={
                            star <= Math.round(rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    <span className="text-sm font-semibold text-gray-700">
                      {rating.toFixed(1)} / 5
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-gray-500">
                    No rating available
                  </span>
                )}
              </div>

              {/* PRICE */}
              <p className="mt-6 text-3xl font-bold text-green-600">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </p>

              {/* DESCRIPTION */}
              <div className="mt-6">
                <h2 className="mb-2 text-lg font-bold text-gray-800">
                  Product Description
                </h2>

                <p className="leading-7 text-gray-600">
                  {product.description}
                </p>
              </div>

              {/* QUANTITY */}
              <div className="mt-7">
                <p className="mb-3 font-semibold text-gray-800">Quantity</p>

                <div className="flex w-fit items-center overflow-hidden rounded-lg border border-gray-200">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="p-3 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaMinus />
                  </button>

                  <span className="min-w-14 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                    className="p-3 text-gray-700 transition hover:bg-gray-100"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              {/* TOTAL */}
              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">
                <span className="font-medium text-gray-600">
                  Total Price
                </span>

                <span className="text-xl font-bold text-gray-900">
                  ₹
                  {(Number(product.price) * quantity).toLocaleString("en-IN")}
                </span>
              </div>

              {/* ADD TO CART */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-gray-900 px-6 py-4 font-semibold text-white shadow transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaShoppingCart />
                {addingToCart ? "Adding to Cart..." : "Add to Cart"}
              </button>

              {/* CART MESSAGE */}
              {message && (
                <p
                  role="status"
                  className={`mt-4 rounded-lg p-3 text-sm ${
                    message.toLowerCase().includes("success")
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {message}
                </p>
              )}

              {/* EXTRA INFO */}
              <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                <FaBoxOpen />
                <span>Quality products at great prices</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SingleProduct;
