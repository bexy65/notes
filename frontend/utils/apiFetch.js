
export async function apiFetch(url, options = {}, logout, navigate) {
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