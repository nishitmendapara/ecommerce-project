import React from "react";
import { FaPlus, FaImage, FaTimes, FaBoxOpen } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiFetch } from "../utils/api";

// ================= INITIAL VALUES =================

const initialvalues = {
  name: "",
  price: "",
  category: "",
  description: "",
  rating: "",
  image: null,
};

// ================= VALIDATION =================

const validateSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(25, "Name must be less than 25 characters")
    .required("Enter product name"),

  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Enter price"),

  category: Yup.string()
    .required("Select a category"),

  description: Yup.string()
    .min(2, "Description must be at least 2 characters")
    .required("Enter description"),

  rating: Yup.number()
    .typeError("Rating must be a number")
    .min(0, "Rating cannot be less than 0")
    .max(5, "Rating cannot be greater than 5")
    .required("Enter product rating"),

  image: Yup.mixed()
    .required("Please select an image")
    .test(
      "fileType",
      "Only JPG, JPEG and PNG images are allowed",
      (value) => {
        if (!value) return true;

        return ["image/jpeg", "image/jpg", "image/png"].includes(
          value.type
        );
      }
    )
    .test(
      "fileSize",
      "Image size must be less than 5MB",
      (value) => {
        if (!value) return true;

        return value.size <= 5 * 1024 * 1024;
      }
    ),
});

// ================= COMPONENT =================

function AddProduct() {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: initialvalues,
    validationSchema: validateSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("category", values.category);
        formData.append("description", values.description);
        formData.append("rating", values.rating);
        formData.append("image", values.image);

        const response = await apiFetch("/addproduct", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        console.log("Add Product Response:", data);

        if (!response.ok) {
          alert(data.message || "Product not added");
          return;
        }

        alert(data.message || "Product added successfully");
        resetForm();
      } catch (error) {
        console.error("Add Product Error:", error);
        alert("Something went wrong. Please try again.");
      }
    },
  });

  // ================= IMAGE SELECT =================

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];

    if (file) {
      setFieldValue("image", file);
    }
  };

  // ================= REMOVE IMAGE =================

  const removeImage = () => {
    setFieldValue("image", null);
  };

  // ================= CLEAR FORM =================

  const handleClear = () => {
    resetForm();
  };

  return (
    <main className="ml-64 min-h-screen bg-slate-50 p-6 md:p-8">

      {/* ================= HEADER ================= */}

      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 text-white shadow">
          <FaBoxOpen className="text-2xl" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Add Product
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Add a new product to your store
          </p>
        </div>
      </div>

      {/* ================= FORM CARD ================= */}

      <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <form onSubmit={handleSubmit}>

          {/* ================= PRODUCT NAME ================= */}

          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter product name"
              className={`w-full rounded-lg border bg-gray-50 px-4 py-3 text-gray-800 outline-none focus:bg-white focus:ring-2 ${
                errors.name && touched.name
                  ? "border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            {errors.name && touched.name && (
              <span className="text-sm text-red-500">
                {errors.name}
              </span>
            )}
          </div>

          {/* ================= PRICE + CATEGORY ================= */}

          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* PRICE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-500">
                  ₹
                </span>

                <input
                  type="text"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter price"
                  min="0.01"
                  step="0.01"
                  className={`w-full rounded-lg border bg-gray-50 py-3 pl-9 pr-4 text-gray-800 outline-none focus:bg-white focus:ring-2 ${
                    errors.price && touched.price
                      ? "border-red-500 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />
              </div>

              {errors.price && touched.price && (
                <span className="text-sm text-red-500">
                  {errors.price}
                </span>
              )}
            </div>

            {/* CATEGORY */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>

              <select
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-lg border bg-gray-50 px-4 py-3 text-gray-700 outline-none focus:bg-white focus:ring-2 ${
                  errors.category && touched.category
                    ? "border-red-500 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Shoes">Shoes</option>
                <option value="Bags">Bags</option>
                <option value="Accessories">Accessories</option>
                <option value="Home">Home</option>
                <option value="Other">Other</option>
              </select>

              {errors.category && touched.category && (
                <span className="text-sm text-red-500">
                  {errors.category}
                </span>
              )}
            </div>
          </div>

          {/* ================= RATING NUMBER INPUT ================= */}

          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Product Rating (0–5)
            </label>

            <input
              type="number"
              name="rating"
              value={values.rating}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter rating (e.g. 4.5)"
              min="0"
              max="5"
              step="0.1"
              className={`w-full rounded-lg border bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:bg-white focus:ring-2 ${
                errors.rating && touched.rating
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            {errors.rating && touched.rating && (
              <span className="text-sm text-red-500">
                {errors.rating}
              </span>
            )}
          </div>

          {/* ================= DESCRIPTION ================= */}

          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter product description"
              rows="5"
              className={`w-full resize-none rounded-lg border bg-gray-50 px-4 py-3 text-gray-800 outline-none focus:bg-white focus:ring-2 ${
                errors.description && touched.description
                  ? "border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            {errors.description && touched.description && (
              <span className="text-sm text-red-500">
                {errors.description}
              </span>
            )}
          </div>

          {/* ================= PRODUCT IMAGE ================= */}

          <div className="mb-8">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Product Image
            </label>

            <div
              className={`rounded-xl border-2 border-dashed p-6 transition ${
                errors.image && touched.image
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300 bg-gray-50 hover:border-blue-400"
              }`}
            >
              {values.image ? (
                <div className="relative mx-auto w-fit">
                  <img
                    src={URL.createObjectURL(values.image)}
                    alt="Product Preview"
                    className="h-52 w-52 rounded-xl object-cover shadow-md"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <FaImage className="mx-auto mb-4 text-5xl text-gray-300" />
                  <p className="font-semibold text-gray-700">
                    Select Product Image
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    PNG, JPG or JPEG
                  </p>
                </div>
              )}

              <div className="mt-5 text-center">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white shadow transition hover:bg-gray-800">
                  <FaImage />
                  {values.image ? "Change Image" : "Choose Image"}

                  <input
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                    onChange={handleImageChange}
                    onBlur={handleBlur}
                  />
                </label>
              </div>

              <p className="mt-3 text-center text-xs text-gray-400">
                Maximum file size: 5MB
              </p>

              {errors.image && touched.image && (
                <p className="mt-2 text-center text-sm font-medium text-red-500">
                  {errors.image}
                </p>
              )}
            </div>
          </div>

          {/* ================= BUTTONS ================= */}

          <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClear}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-100"
            >
              Clear
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-7 py-3 font-semibold text-white shadow-md transition hover:bg-gray-800"
            >
              <FaPlus />
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* ================= FOOTER ================= */}

      <p className="mt-6 text-center text-sm text-gray-400">
        Admin Dashboard · Product Management
      </p>
    </main>
  );
}

export default AddProduct;
