import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaUsers,
} from "react-icons/fa";
import { apiFetch } from "../utils/api";

function Usercontact() {
  const [search, setSearch] = useState("");

  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(true);

  // ============================
  // GET ALL CONTACTS
  // ============================

  const getContacts = async () => {
    try {
      setLoading(true);

      const response = await apiFetch("/getcontact", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      console.log("Get Contacts Response:", data);

      if (!response.ok) {
        alert(data.message || "Failed to get contacts");
        return;
      }

      setContacts(data.contacts || []);
    } catch (error) {
      console.log("Get Contacts Error:", error);

      alert("Something went wrong while getting contacts");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // GET CONTACTS WHEN PAGE LOADS
  // ============================

  useEffect(() => {
    getContacts();
  }, []);

  // ============================
  // DELETE CONTACT
  // ============================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await apiFetch(`/deletecontact/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      console.log("Delete Contact Response:", data);

      if (!response.ok) {
        alert(data.message || "Contact delete failed");
        return;
      }

      alert(data.message || "Contact deleted successfully");

      // Remove deleted contact from frontend
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== id),
      );
    } catch (error) {
      console.log("Delete Contact Error:", error);

      alert("Something went wrong while deleting contact");
    }
  };

  // ============================
  // SEARCH CONTACTS
  // ============================

  const filteredContacts = contacts.filter((contact) => {
    const name = contact.name?.toLowerCase() || "";
    const email = contact.email?.toLowerCase() || "";
    const mobile = contact.mobile?.toString() || "";

    const searchValue = search.toLowerCase();

    return (
      name.includes(searchValue) ||
      email.includes(searchValue) ||
      mobile.includes(searchValue)
    );
  });

  return (
    <main className="ml-64 min-h-screen bg-slate-50 p-6 md:p-8">
      {/* ============================
          HEADER
      ============================ */}

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 text-white shadow">
            <FaUsers className="text-2xl" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">User Contacts</h1>

            <p className="mt-1 text-sm text-gray-500">
              View and manage user contact messages
            </p>
          </div>
        </div>

        {/* SEARCH */}

        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* ============================
          TOTAL CONTACTS
      ============================ */}

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <FaUsers />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Contacts</p>

              <h2 className="text-2xl font-bold text-gray-800">
                {contacts.length}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* ============================
          CONTACT TABLE
      ============================ */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* TABLE HEADER */}

        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-bold text-gray-800">User Contact List</h2>

          <p className="mt-1 text-sm text-gray-500">
            View user contact information
          </p>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-250">
            <thead>
              <tr className="bg-gray-50 text-left text-sm uppercase tracking-wide text-gray-500">
                <th className="px-6 py-4">#</th>

                <th className="px-6 py-4">User Name</th>

                <th className="px-6 py-4">Email</th>

                <th className="px-6 py-4">Mobile No</th>

                <th className="px-6 py-4">Description</th>

                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {/* ============================
                  LOADING
              ============================ */}

              {loading ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900"></div>

                      <p className="mt-4">Loading contacts...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredContacts.length > 0 ? (
                /* ============================
                   CONTACTS
                ============================ */

                filteredContacts.map((contact, index) => (
                  <tr key={contact._id} className="transition hover:bg-gray-50">
                    {/* NUMBER */}

                    <td className="px-6 py-5 font-semibold text-gray-500">
                      {index + 1}
                    </td>

                    {/* USER NAME */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 font-bold text-white">
                          {contact.name?.charAt(0).toUpperCase()}
                        </div>

                        <span className="font-semibold text-gray-800">
                          {contact.name}
                        </span>
                      </div>
                    </td>

                    {/* EMAIL */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaEnvelope className="text-blue-500" />

                        <span>{contact.email}</span>
                      </div>
                    </td>

                    {/* MOBILE */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaPhone className="text-green-500" />

                        <span>{contact.mobile}</span>
                      </div>
                    </td>

                    {/* DESCRIPTION */}

                    <td className="max-w-md px-6 py-5">
                      <p className="line-clamp-2 text-sm leading-6 text-gray-600">
                        {contact.description}
                      </p>
                    </td>

                    {/* DELETE */}

                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDelete(contact._id)}
                          className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* ============================
                   NO CONTACTS
                ============================ */

                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <FaUsers className="mx-auto mb-4 text-5xl text-gray-300" />

                    <h3 className="text-lg font-semibold text-gray-600">
                      No Contacts Found
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                      No user contact matches your search.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER */}

      <p className="mt-6 text-center text-sm text-gray-400">
        Admin Dashboard · User Contact Management
      </p>
    </main>
  );
}

export default Usercontact;
