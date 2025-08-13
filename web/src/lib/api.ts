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
    const response = await api.get(`/products/q/${slug}`);
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
