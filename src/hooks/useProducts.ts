import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, getProductBySlug, getProductsByCategory, addProduct, updateProduct, deleteProduct, getLowStockProducts, updateProductStock } from "@/services/products";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductParams {
  category?: string;
  allProducts?: boolean;
  featuredProducts?: boolean;
  reduced?: boolean;
  outOfStock?: boolean;
}

export const useProducts = (params?: ProductParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
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

export const useProductsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["products", "category", categoryId],
    queryFn: () => getProductsByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/admin/product-list");
    },
     onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add product.");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => updateProduct(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
      router.push("/admin/product-list");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update product.");
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete product.");
    },
  });
};

export const useLowStockProducts = () => {
  return useQuery({
    queryKey: ["products", "low-stock"],
    queryFn: getLowStockProducts,
    staleTime: 2 * 60 * 1000, // 2 minutes for stock data
  });
};

export const useUpdateProductStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, stock }: { id: string; stock: number }) => updateProductStock(id, stock),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", "low-stock"] });
      toast.success("Product stock updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update product stock.");
    },
  });
};