import api from "@/lib/axios";
import { ProductsResponse,Product } from "@/types/product";

export const getProducts = async (category?: string): Promise<ProductsResponse> => {
  const params = category ? { category } : {};
  const { data } = await api.get("/api/products", { params });
  return data;
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const { data } = await api.get(`/api/products/slug/${slug}`);
  return data.data;
};
