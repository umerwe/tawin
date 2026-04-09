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
