import { useMutation, useQuery } from "@tanstack/react-query";
import { applyForBasket, getAdminBasketRequests, BasketApplicationData } from "@/services/basket";
import { toast } from "sonner";

export const useApplyForBasket = () => {

  return useMutation({
    mutationFn: (data: BasketApplicationData) => applyForBasket(data),
    onSuccess: () => {
      toast.success("Application submitted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to submit application");
    },
  });
};

export const useAdminBasketRequests = (params?: {
  page?: number;
  status?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["admin", "basket-requests", params?.page, params?.status, params?.search],
    queryFn: () => getAdminBasketRequests(params),
    staleTime: 2 * 60 * 1000,
  });
};