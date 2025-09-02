import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function getProducts(page: number, perPage: number) {
  try {
    const response = await api.get(`/products?page=${page}&perPage=${perPage}`);
    const data = response.data;

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getProduct(slug: string) {
  try {
    const url = `/products/q/${slug}`;

    const response = await api.get(url);
    const data = response.data;

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function searchProducts(query: string) {
  try {
    const response = await api.get(`/products/search/filter?q=${query}`);
    const data = response.data;

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getFeaturedProducts() {
  try {
    const response = await api.get("/products/categories/featured-products");
    const data = response.data;

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getProductsByCategory(
  slug: string,
  page: number,
  perPage: number
) {
  try {
    const response = await api.get(
      `/products/categories/${slug}?page=${page}&perPage=${perPage}`
    );
    const data = response.data;

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getFeaturedCategories() {
  try {
    const response = await api.get("/categories/featured");
    const data = response.data;

    return data;
  } catch (err) {
    console.log(err);
  }
}
