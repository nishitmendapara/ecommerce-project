import { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { apiFetch, getImageUrl } from "../utils/api";


function CartProducts() {
  const [search, setSearch] = useState("");
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all carts from the database
  const getAllCarts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch("/allcart", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch cart products");
      }

      setCarts(data.carts || []);
    } catch (error) {
      console.error("Get All Carts Error:", error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCarts();
  }, []);

  // Flatten cart documents into individual product rows
  const cartProducts = carts.flatMap((cart) =>
    (cart.items || []).map((item) => ({
      cartId: cart._id,
      user: cart.userId,
      product: item.product,
      quantity: item.quantity,
    })),
  );

  // Search by product, category, or user
  const filteredProducts = cartProducts.filter((item) => {
    const name = item.product?.name || "";
    const category = item.product?.category || "";
    const userName = item.user?.name || "";
    const email = item.user?.email || "";

    const searchText = search.toLowerCase();

    return (
      name.toLowerCase().includes(searchText) ||
      category.toLowerCase().includes(searchText) ||
      userName.toLowerCase().includes(searchText) ||
      email.toLowerCase().includes(searchText)
    );
  });

  // Number of distinct cart product rows
  const totalProducts = cartProducts.length;

  // Sum of all product quantities
  const totalItems = cartProducts.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );

  // Total value of all cart items
  const totalAmount = cartProducts.reduce((total, item) => {
    const price = Number(item.product?.price || 0);
    return total + price * Number(item.quantity || 0);
  }, 0);

  return (
    <main className="ml-64 min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 text-white shadow">
            <FaShoppingCart className="text-2xl" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">Cart Products</h1>
            <p className="mt-1 text-sm text-gray-500">
              View products added to customers' carts
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search product or user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Cart Products</p>
          <h2 className="mt-1 text-2xl font-bold text-gray-800">
            {loading ? "..." : totalProducts}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Items</p>
          <h2 className="mt-1 text-2xl font-bold text-gray-800">
            {loading ? "..." : totalItems}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Amount</p>
          <h2 className="mt-1 text-2xl font-bold text-green-600">
            {loading ? "..." : `₹${totalAmount.toLocaleString("en-IN")}`}
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-bold text-gray-800">Cart Product List</h2>
          <p className="mt-1 text-sm text-gray-500">
            Products currently stored in MongoDB carts
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-237.5">
            <thead>
              <tr className="bg-gray-50 text-left text-sm uppercase tracking-wide text-gray-500">
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">Quantity</th>
                <th className="px-6 py-4">Total</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-16 text-center text-gray-500">
                    Loading cart products...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="8" className="py-16 text-center text-red-500">
                    <p>{error}</p>
                    <button
                      onClick={getAllCarts}
                      className="mt-3 font-semibold text-blue-600 hover:underline"
                    >
                      Try again
                    </button>
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((item, index) => {
                  const product = item.product;
                  const price = Number(product?.price || 0);
                  const quantity = Number(item.quantity || 0);

                  const imageUrl = getImageUrl(product?.image);

                  return (
                    <tr
                      key={`${item.cartId}-${product?._id || index}`}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-500">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={product?.name || "Product"}
                            className="h-16 w-16 rounded-lg object-cover shadow-sm"
                          />
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                            <FaShoppingCart />
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800">
                          {product?.name || "Product unavailable"}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.user?.name || item.user?.email || "Unknown"}
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-800">
                        ₹{price.toLocaleString("en-IN")}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                          {product?.category || "N/A"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex min-w-10 justify-center rounded-lg bg-gray-100 px-3 py-2 font-semibold text-gray-700">
                          {quantity}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-bold text-green-600">
                          ₹{(price * quantity).toLocaleString("en-IN")}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="py-16 text-center">
                    <FaShoppingCart className="mx-auto mb-4 text-5xl text-gray-300" />
                    <h3 className="text-lg font-semibold text-gray-600">
                      No Products Found
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      {search
                        ? "No cart product matches your search."
                        : "No products have been added to any cart."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total */}
      <div className="mt-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="rounded-lg bg-gray-100 px-5 py-3">
          <p className="text-sm text-gray-500">Total Items</p>
          <p className="text-xl font-bold text-gray-800">
            {loading ? "..." : totalItems}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Total Cart Amount</p>
          <h2 className="text-3xl font-bold text-green-600">
            {loading ? "..." : `₹${totalAmount.toLocaleString("en-IN")}`}
          </h2>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-gray-400">
        Admin Dashboard · Cart Management
      </p>
    </main>
  );
}

export default CartProducts;
