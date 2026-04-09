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

export const useAdminBasketRequests = () => {
  return useQuery({
    queryKey: ["admin", "basket-requests"],
    queryFn: getAdminBasketRequests,
    staleTime: 2 * 60 * 1000,
  });
};