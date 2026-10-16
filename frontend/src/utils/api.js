export const API_BASE = (
  import.meta.env.VITE_BACKEND_URL ||
  "https://ecommerce-project-1-bx9m.onrender.com"
).replace(/\/+$/, "");

// Use this for protected API requests.
export const apiFetch = async (url, options = {}) => {
  const requestOptions = {
    ...options,
    credentials: "include",
  };

  // First request using the existing access token.
  let response = await fetch(
    `${API_BASE}${url}`,
    requestOptions
  );

  // If the access token expired, refresh it.
  if (response.status === 401 && url !== "/refresh") {
    const refreshResponse = await fetch(
      `${API_BASE}/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    // Refresh token is invalid or expired.
    if (!refreshResponse.ok) {
      window.dispatchEvent(
        new Event("auth:session-expired")
      );

      return response;
    }

    // Retry the original request with the new cookie.
    response = await fetch(
      `${API_BASE}${url}`,
      requestOptions
    );
  }

  return response;
};