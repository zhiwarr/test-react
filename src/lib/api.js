import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(
  /\/+$/,
  "",
);

async function request(path, { method = "GET", body, token } = {}) {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${path}`,
      method,
      data: body,
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Request failed.";

    throw new Error(message);
  }
}

export async function login(email, password) {
  const payload = await request("/login", {
    method: "POST",
    body: { email, password },
  });

  const data = payload?.data;
  const token = data?.token;

  if (!token) {
    throw new Error("Token not returned from login API.");
  }

  return {
    token,
    email: data?.user?.email,
  };
}

export async function logout(token) {
  await request("/logout", {
    method: "DELETE",
    token,
  });
}

export async function fetchProducts(token) {
  const payload = await request("/products", {
    method: "GET",
    token,
  });

  const products = payload?.data;
  if (!Array.isArray(products)) {
    throw new Error("Invalid products data received from API.");
  }

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    price: Number(product.price_in_usd ?? product.price ?? 0),
    priceInIqd: Number(product.price_in_iqd ?? 0),
    quantity: Number(product.quantity ?? 0),
    totalPriceInUsd: Number(product.total_price_in_usd ?? 0),
    totalPriceInIqd: Number(product.total_price_in_iqd ?? 0),
    category: product.category?.name ?? "Uncategorized",
  }));
}

export async function fetchCategories(token) {
  const payload = await request("/categories", {
    method: "GET",
    token,
  });

  const categories = payload?.data;
  if (!Array.isArray(categories)) {
    throw new Error("Invalid categories data received from API.");
  }

  return categories.map((category) => ({
    id: category.id,
    name: category.name,
  }));
}

export async function createProduct(token, input) {
  const body = {
    name: input.name,
    price_in_iqd: Number(input.priceInIqd),
    price_in_usd: Number(input.priceInUsd),
    quantity: Number(input.quantity),
    category_id: Number(input.categoryId),
  };

  const payload = await request("/products", {
    method: "POST",
    token,
    body,
  });

  const created = payload?.data;
  return {
    id: created.id,
    name: created.name,
    price: Number(created.price_in_usd ?? created.price ?? 0),
    priceInIqd: Number(created.price_in_iqd ?? 0),
    quantity: Number(created.quantity ?? 0),
    totalPriceInUsd: Number(created.total_price_in_usd ?? 0),
    totalPriceInIqd: Number(created.total_price_in_iqd ?? 0),
    category: created.category?.name ?? "Uncategorized",
  };
}
