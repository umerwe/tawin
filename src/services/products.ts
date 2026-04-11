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

export const getProductsByCategory = async (categoryId: string): Promise<ProductsResponse> => {
  const { data } = await api.get(`/api/products/category/${categoryId}`);
  return data;
};

export const addProduct = async (formData: FormData): Promise<any> => {
  const { data } = await api.post("/api/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateProduct = async (id: string, formData: FormData): Promise<any> => {
  const { data } = await api.patch(`/api/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteProduct = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/api/products/${id}`);
  return data;
};
