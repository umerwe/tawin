import api from "@/lib/axios";
import { CategoriesResponse, Category } from "@/types/category";

export const getCategories = async (): Promise<CategoriesResponse> => {
  const { data } = await api.get("/api/categories");
  return data;
};

export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const { data } = await api.get(`/api/categories/slug/${slug}`);
  return data.data;
};

export const createCategory = async (formData: FormData): Promise<Category> => {
  const { data } = await api.post("/api/categories", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateCategory = async ({ id, formData }: { id: string; formData: FormData }): Promise<Category> => {
  const { data } = await api.patch(`/api/categories/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/api/categories/${id}`);
};
