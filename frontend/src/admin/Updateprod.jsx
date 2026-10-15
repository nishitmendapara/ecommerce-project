import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaImage, FaSave, FaTimes, FaArrowLeft } from "react-icons/fa";
import { apiFetch } from "../utils/api";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ============================
  // STATES
  // ============================

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const [product, setProduct] = useState(null);

  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(false);

  // ============================
  // GET SINGLE PRODUCT
  // ============================

  const getProduct = async () => {
    try {
      setLoading(true);

      const response = await apiFetch(
        `/singleproduct/${id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      console.log("Single Product Response:", data);

      if (!response.ok) {
        alert(data.message || "Product not found");
        return;
      }

      const productData = data.product;

      setProduct(productData);

      // Set form values
      setFormData({
        name: productData.name || "",
        price: productData.price || "",
        category: productData.category || "",
        description: productData.description || "",
      });

      // Set existing image
      if (productData.image) {
        setImagePreview(`http://localhost:5000/images/${productData.image}`);
      }
    } catch (error) {
      console.log("Get Product Error:", error);

      alert("Something went wrong while getting product");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // GET PRODUCT WHEN PAGE LOADS
  // ============================

  useEffect(() => {
    getProduct();
  }, [id]);

  // ============================
  // INPUT CHANGE
  // ============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================
  // IMAGE CHANGE
  // ============================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Check image type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    // Check image size
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    // Save file
    setImage(file);

    // Create preview
    setImagePreview(URL.createObjectURL(file));
  };

  // ============================
  // REMOVE NEW IMAGE
  // ============================

  const handleRemoveImage = () => {
    setImage(null);

    if (product?.image) {
      setImagePreview(`http://localhost:5000/images/${product.image}`);
    } else {
      setImagePreview("");
    }
  };

  // ============================
  // UPDATE PRODUCT
  // ============================

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.description
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setUpdating(true);

      // FormData because image is being uploaded
      const data = new FormData();

      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("description", formData.description);

      // Add image only if new image selected
      if (image) {
        data.append("image", image);
      }

      const response = await apiFetch(
        `/updateproduct/${id}`,
        {
          method: "PUT",
          credentials: "include",
          body: data,
        },
      );

      const result = await response.json();

      console.log("Update Product Response:", result);

      if (!response.ok) {
        alert(result.message || "Product update failed");
        return;
      }

      alert(result.message || "Product updated successfully");

      // Go back to all products
      navigate("/all-product");
    } catch (error) {
      console.log("Update Product Error:", error);

      alert("Something went wrong while updating product");
    } finally {
      setUpdating(false);
    }
  };

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <main className="ml-64 min-h-screen bg-slate-50 p-6 md:p-8">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900"></div>

            <p className="mt-4 text-gray-500">Loading product...</p>
          </div>
        </div>
      </main>
    );
  }

  // ============================
  // PRODUCT NOT FOUND
  // ============================

  if (!product) {
    return (
      <main className="ml-64 min-h-screen bg-slate-50 p-6 md:p-8">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-700">
              Product Not Found
            </h2>

            <p className="mt-2 text-gray-500">
              The product you are trying to update does not exist.
            </p>

            <button
              onClick={() => navigate("/all-product")}
              className="mt-6 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Back to Products
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ============================
  // PAGE
  // ============================

  return (
    <main className="ml-64 min-h-screen bg-slate-50 p-6 md:p-8">
      {/* ============================
          HEADER
      ============================ */}

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 text-white shadow">
            <FaEdit className="text-2xl" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">Update Product</h1>

            <p className="mt-1 text-sm text-gray-500">
              Update product information
            </p>
          </div>
        </div>

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate("/all-product")}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-600 shadow-sm transition hover:bg-gray-100"
        >
          <FaArrowLeft />
          Back to Products
        </button>
      </div>

      {/* ============================
          FORM
      ============================ */}

      <form
        onSubmit={handleUpdate}
        className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
      >
        {/* FORM HEADER */}

        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-bold text-gray-800">
            Product Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Change the product details below.
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* PRODUCT NAME */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* PRICE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* CATEGORY */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select Category</option>

                <option value="Electronics">Electronics</option>

                <option value="Shoes">Shoes</option>

                <option value="Clothing">Clothing</option>

                <option value="Bags">Bags</option>

                <option value="Accessories">Accessories</option>

                <option value="Home">Home</option>
              </select>
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Enter product description"
                className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* ============================
              IMAGE
          ============================ */}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Product Image
            </label>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* IMAGE PREVIEW */}

              <div className="flex min-h-64 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt={formData.name}
                      className="h-56 w-56 rounded-xl object-cover shadow-md"
                    />

                    {/* REMOVE NEW IMAGE */}

                    {image && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow hover:bg-red-700"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <FaImage className="mx-auto mb-3 text-5xl text-gray-300" />

                    <p className="text-sm text-gray-500">No image</p>
                  </div>
                )}
              </div>

              {/* UPLOAD */}

              <div className="flex flex-col justify-center">
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 transition hover:border-blue-400 hover:bg-blue-50">
                  <FaImage className="mb-3 text-4xl text-blue-500" />

                  <span className="font-semibold text-gray-700">
                    Change Product Image
                  </span>

                  <span className="mt-1 text-sm text-gray-400">
                    PNG, JPG or JPEG · Maximum 5MB
                  </span>

                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {image && (
                  <p className="mt-3 text-center text-sm text-green-600">
                    New image selected: {image.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ============================
              BUTTONS
          ============================ */}

          <div className="mt-8 flex flex-col justify-end gap-3 border-t border-gray-100 pt-6 sm:flex-row">
            {/* CANCEL */}

            <button
              type="button"
              onClick={() => navigate("/all-product")}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-100"
            >
              <FaTimes />
              Cancel
            </button>

            {/* UPDATE */}

            <button
              type="submit"
              disabled={updating}
              className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-7 py-3 font-semibold text-white shadow-md transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaSave />

              {updating ? "Updating..." : "Update Product"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default UpdateProduct;
