import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiFetch } from "../utils/api";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .max(254, "Email is too long")
    .required("Email is required"),

  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),

  address: Yup.string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address cannot exceed 200 characters")
    .required("Address is required"),

  description: Yup.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message cannot exceed 500 characters")
    .required("Description is required"),
});

function Contact() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      address: "",
      description: "",
    },

    validationSchema,

    onSubmit: async (values, { resetForm, setStatus }) => {
      try {
        const response = await apiFetch("/contact", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            address: values.address.trim(),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to send message");
        }

        setStatus({
          type: "success",
          message: data.message || "Message sent successfully!",
        });

        resetForm();
      } catch (error) {
        setStatus({
          type: "error",
          message: error.message || "Something went wrong",
        });
      }
    },
  });

  const inputClass = (field) =>
    `w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-4 ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-500 focus:border-red-500 focus:ring-red-50"
        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-50"
    }`;

  const errorClass = "mt-1.5 text-sm text-red-600";

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-50 py-16">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-purple-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-indigo-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600">
                Contact Us
              </span>
              <span className="h-px w-10 bg-indigo-500" />
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              We'd love to
              <span className="block bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                hear from you.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Have a question, suggestion, or need help with your order? Get in
              touch with the Shop Cart team and we'll be happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            {/* LEFT CONTACT INFORMATION */}
            <div className="lg:col-span-2">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-indigo-500" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600">
                  Get In Touch
                </span>
              </div>

              <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                Let's connect with
                <span className="block bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Shop Cart.
                </span>
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-500">
                We're always happy to hear from our customers. Send us your
                questions, feedback, or suggestions and our team will get back
                to you.
              </p>

              <div className="mt-8 space-y-4">
                {/* EMAIL */}
                <div className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                    <FaEnvelope className="text-lg text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Email</p>
                    <p className="mt-1 text-sm text-slate-500">
                      support@shopcart.com
                    </p>
                  </div>
                </div>

                {/* MOBILE */}
                <div className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                    <FaPhone className="text-lg text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Mobile</p>
                    <p className="mt-1 text-sm text-slate-500">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                {/* BUSINESS ADDRESS */}
                <div className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                    <FaMapMarkerAlt className="text-lg text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Address
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Surat, Gujarat, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100 sm:p-8">
                <div className="mb-7">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Send us a message
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Fill out the form below and we'll get back to you.
                  </p>
                </div>

                <form
                  onSubmit={formik.handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Name
                    </label>

                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
                      <input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        className={inputClass("name")}
                        {...formik.getFieldProps("name")}
                        aria-invalid={Boolean(
                          formik.touched.name && formik.errors.name
                        )}
                      />
                    </div>

                    {formik.touched.name && formik.errors.name && (
                      <p className={errorClass}>{formik.errors.name}</p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email
                    </label>

                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className={inputClass("email")}
                        {...formik.getFieldProps("email")}
                        aria-invalid={Boolean(
                          formik.touched.email && formik.errors.email
                        )}
                      />
                    </div>

                    {formik.touched.email && formik.errors.email && (
                      <p className={errorClass}>{formik.errors.email}</p>
                    )}
                  </div>

                  {/* MOBILE */}
                  <div>
                    <label
                      htmlFor="mobile"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Mobile
                    </label>

                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
                      <input
                        id="mobile"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="Enter your mobile number"
                        className={inputClass("mobile")}
                        {...formik.getFieldProps("mobile")}
                        aria-invalid={Boolean(
                          formik.touched.mobile && formik.errors.mobile
                        )}
                      />
                    </div>

                    {formik.touched.mobile && formik.errors.mobile && (
                      <p className={errorClass}>{formik.errors.mobile}</p>
                    )}
                  </div>

                  {/* ADDRESS - ADDED */}
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Address
                    </label>

                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-4 top-4 text-sm text-slate-400" />
                      <textarea
                        id="address"
                        rows={3}
                        maxLength={200}
                        placeholder="Enter your full address"
                        className={`w-full resize-none rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-4 ${
                          formik.touched.address && formik.errors.address
                            ? "border-red-500 focus:border-red-500 focus:ring-red-50"
                            : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-50"
                        }`}
                        {...formik.getFieldProps("address")}
                        aria-invalid={Boolean(
                          formik.touched.address && formik.errors.address
                        )}
                      />
                    </div>

                    {formik.touched.address && formik.errors.address && (
                      <p className={errorClass}>{formik.errors.address}</p>
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Description
                    </label>

                    <textarea
                      id="description"
                      rows={5}
                      maxLength={500}
                      placeholder="Write your message..."
                      className={`w-full resize-none rounded-xl border bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-4 ${
                        formik.touched.description &&
                        formik.errors.description
                          ? "border-red-500 focus:border-red-500 focus:ring-red-50"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-50"
                      }`}
                      {...formik.getFieldProps("description")}
                      aria-invalid={Boolean(
                        formik.touched.description &&
                          formik.errors.description
                      )}
                    />

                    {formik.touched.description &&
                      formik.errors.description && (
                        <p className={errorClass}>
                          {formik.errors.description}
                        </p>
                      )}

                    <p className="mt-1 text-right text-xs text-slate-400">
                      {formik.values.description.length}/500
                    </p>
                  </div>

                  {/* SERVER RESPONSE */}
                  {formik.status?.message && (
                    <p
                      role="status"
                      className={`rounded-xl p-3 text-sm ${
                        formik.status.type === "success"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {formik.status.message}
                    </p>
                  )}

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {formik.isSubmitting ? "Sending..." : "Send Message"}
                    <FaPaperPlane className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>  
      </section>

      {/* MAP */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-indigo-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600">
                Find Us
              </span>
              <span className="h-px w-10 bg-indigo-500" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Visit our{" "}
              <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                location.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500">
              You can find Shop Cart in Surat, Gujarat. We would love to hear
              from you and help you with your shopping experience.
            </p>
          </div>

          <div className="relative mt-12 overflow-hidden rounded-3xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/60">
            <iframe
              title="Shop Cart Location"
              src="https://www.google.com/maps?q=Surat,Gujarat,India&output=embed"
              className="h-100 w-full rounded-2xl border-0 sm:h-125"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
            <FaEnvelope className="text-xl text-indigo-600" />
          </div>

          <h2 className="mt-5 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Have something to tell us?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Your feedback helps us improve Shop Cart and create a better
            shopping experience for everyone.
          </p>
        </div>
      </section>
    </>
  );
}

export default Contact;
