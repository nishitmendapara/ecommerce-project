import React, { useState, useEffect } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { apiFetch } from "../utils/api";

function Users() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get users from MongoDB through the backend
  const getUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch("/allusers", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      setUsers(data.users || []);
    } catch (error) {
      console.error("Get Users Error:", error);
      setError(error.message || "Something went wrong while fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Search users
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.address?.toLowerCase().includes(search.toLowerCase()) ||
      user.gender?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="ml-64 min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
        <p className="mt-1 text-gray-500">View all registered user details</p>
      </div>

      {/* Top Section */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Total Users */}
        <div className="flex items-center gap-4 rounded-xl bg-white px-6 py-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <FaUser />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h2 className="text-2xl font-bold text-gray-900">
              {loading ? "..." : users.length}
            </h2>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full min-w-200 text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                #
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Address
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Gender
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  Loading users...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-red-500">
                  {error}
                  <button
                    onClick={getUsers}
                    className="ml-3 font-semibold text-blue-600 hover:underline"
                  >
                    Try again
                  </button>
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user._id} className="transition hover:bg-gray-50">
                  {/* Number */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {index + 1}
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <FaUser />
                      </div>

                      <span className="font-semibold text-gray-900">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>

                  {/* Address */}
                  <td className="max-w-xs px-6 py-4 text-sm text-gray-600">
                    {user.address || "N/A"}
                  </td>

                  {/* Gender */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.gender?.toLowerCase() === "male"
                          ? "bg-blue-100 text-blue-700"
                          : user.gender?.toLowerCase() === "female"
                            ? "bg-pink-100 text-pink-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.gender || "N/A"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {search ? "No users match your search." : "No users found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Users;
