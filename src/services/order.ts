import api from "@/lib/axios";

export interface OrderFormData {
  addressId: string;
  paymentMethod: string;
  couponCode?: string;
  phone: string;
}

export const createOrder = async (formData: OrderFormData) => {
  const { data } = await api.post("/api/order", formData);
  return data;
};

export const getOrderById = async (id: string) => {
  const { data } = await api.get(`/api/order/${id}`);
  return data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const { data } = await api.patch(`/api/order/${id}`, { status });
  return data;
};

export const deleteOrder = async (id: string) => {
  const { data } = await api.delete(`/api/order/${id}`);
  return data;
};
