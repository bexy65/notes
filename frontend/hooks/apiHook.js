import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function useApi() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function authenticatedFetch(url, options = {}) {
    const token = localStorage.getItem("token");

    if (!token) {
      logout();
      navigate("/login");
      return null;
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.status === 401) {
      logout();
      navigate("/login");

      return null;
    }

    return response;
  }

  return { authenticatedFetch };
}