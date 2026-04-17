import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrder, getOrderById, updateOrderStatus, deleteOrder, OrderFormData, getOrders } from "@/services/order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// User Order Hooks
export const useCreateOrder = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: OrderFormData) => createOrder(formData),
    onSuccess: () => {
      toast.success("Order placed successfully!");
      router.push("/order-success");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to place order.");
    },
  });
};

export const useOrderById = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Admin Order Hooks
export const useGetOrders = (queryParams?: { status?: string; page?: number; search?: string }) => {
  return useQuery({
    queryKey: ["orders", queryParams],
    queryFn: () => getOrders(queryParams),
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order status updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update order status.");
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete order.");
    },
  });
};
