import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductReviews, createReview, getReviews } from "@/services/review";
import { toast } from "sonner";

export const useReviews = (params?: any) => {
  return useQuery({
    queryKey: ["reviews", params],
    queryFn: () => getReviews(params),
  });
};

export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReview,
    onSuccess: (data) => {
      toast.success(data.message || "Review submitted successfully!");
      // Invalidate both the reviews list and potentially the product (to update rating/count)
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to submit review");
    },
  });
};