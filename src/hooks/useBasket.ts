import { useMutation } from "@tanstack/react-query";
import { applyForBasket, BasketApplicationData } from "@/services/basket";
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