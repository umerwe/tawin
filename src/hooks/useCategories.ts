import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryBySlug } from "@/services/categories";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000, 
  });
};

export const useGetCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};
