const API = "/api";

export function getToken() {
  return localStorage.getItem("admin_token") || "";
}

export function setToken(t: string) {
  localStorage.setItem("admin_token", t);
}

export function clearToken() {
  localStorage.removeItem("admin_token");
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
}

export const api = {
  login: (username: string, password: string) =>
    request("/admin/login", { method: "POST", body: JSON.stringify({ username, password }) }),

  getBlogPosts: () => request("/blog"),
  getBlogPost: (slug: string) => request(`/blog/${slug}`),
  createBlogPost: (data: unknown) => request("/admin/blog", { method: "POST", body: JSON.stringify(data) }),
  updateBlogPost: (id: number, data: unknown) => request(`/admin/blog/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteBlogPost: (id: number) => request(`/admin/blog/${id}`, { method: "DELETE" }),

  getContacts: () => request("/contact"),

  getSeoSettings: () => request("/seo"),
  updateSeoSettings: (page: string, data: unknown) => request(`/admin/seo/${page}`, { method: "PUT", body: JSON.stringify(data) }),
};
