import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/v1",
});

export async function getProducts() {
  try {
    const response = await api.get("/products");
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
