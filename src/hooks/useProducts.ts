import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductBySlug } from "@/services/products";

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => getProducts(category),
    staleTime: 5 * 60 * 1000, 
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};
