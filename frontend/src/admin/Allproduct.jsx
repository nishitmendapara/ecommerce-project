
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus,
  FaBoxOpen,
  FaStar,
} from "react-icons/fa";
import { apiFetch, getImageUrl } from "../utils/api";

function AllProduct() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET ALL PRODUCTS
  const getProducts = async () => {
    try {
      setLoading(true);

      const response = await apiFetch("/getproducts", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      console.log("Get Products Response:", data);

      if (!response.ok) {
        alert(data.message || "Failed to get products");
        return;
      }

      setProducts(data.products || []);
    } catch (error) {
      console.log("Get Products Error:", error);
      alert("Something went wrong while getting products");
    } finally {
      setLoading(false);
    }
  };

  // GET PRODUCTS WHEN PAGE LOADS
  useEffect(() => {
    getProducts();
  }, []);

  // SEARCH PRODUCTS
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await apiFetch(`/deleteproduct/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      console.log("Delete Product Response:", data);

      if (!response.ok) {
        alert(data.message || "Product delete failed");
        return;
      }

      alert(data.message || "Product deleted successfully");

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.log("Delete Product Error:", error);
      alert("Something went wrong while deleting product");
    }
  };

  return (
    <main className="ml-64 min-h-screen bg-slate-50 p-6">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all products in your store
          </p>
        </div>

        <Link
          to="/add-product"
          className="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white shadow transition hover:bg-gray-800"
        >
          <FaPlus />
          Add Product
        </Link>
      </div>

      {/* TOTAL PRODUCTS + SEARCH */}
      <div className="mb-6 flex items-center justify-between rounded-xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <FaBoxOpen className="text-xl" />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Products</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {products.length}
            </h2>
          </div>
        </div>

        {/* SEARCH */}
        <div className="relative w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* PRODUCT TABLE */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-bold text-gray-800">Product List</h2>
          <p className="text-sm text-gray-500">
            View and manage your products
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            {/* TABLE HEADER */}
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-500">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-gray-500">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const rating = Number(product.rating);
                  const validRating =
                    Number.isFinite(rating) && rating >= 0 && rating <= 5;

                  return (
                    <tr
                      key={product._id}
                      className="transition hover:bg-gray-50"
                    >
                      {/* IMAGE */}
                      <td className="px-6 py-4">
                        <img
                          src={getImageUrl(product.image)}
                          alt={product.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      </td>

                      {/* NAME */}
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {product.name}
                      </td>

                      {/* PRICE */}
                      <td className="px-6 py-4 font-semibold text-green-600">
                        ₹{product.price}
                      </td>

                      {/* CATEGORY */}
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                          {product.category}
                        </span>
                      </td>

                      {/* RATING */}
                      <td className="px-6 py-4">
                        {validRating ? (
                          <div className="flex items-center gap-1 whitespace-nowrap">
                            <FaStar className="text-yellow-400" />
                            <span className="font-semibold text-gray-800">
                              {rating.toFixed(1)}
                            </span>
                            <span className="text-sm text-gray-400">/ 5</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">
                            No rating
                          </span>
                        )}
                      </td>

                      {/* DESCRIPTION */}
                      <td className="max-w-xs px-6 py-4 text-sm text-gray-500">
                        {product.description}
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link
                            to={`/update-product/${product._id}`}
                            className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                          >
                            <FaEdit />
                            Update
                          </Link>

                          <button
                            onClick={() => handleDelete(product._id)}
                            className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                          >
                            <FaTrash />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default AllProduct;
