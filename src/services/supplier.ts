import api from "@/lib/axios";
import { SupplierFormValues } from "@/validations/supplier";

export interface AddStockFormData {
  supplierId: string;
  products: Array<{
    productId: string;
    quantity: number;
    batchNumber?: string;
    expiryDate?: string;
  }>;
  deliveryDate: string;
  invoiceNumber?: string;
  notes?: string;
}

export const getSuppliers = async (queryParams?: { search?: string; page?: number }) => {
  const { data } = await api.get("/api/suppliers", { params: queryParams });
  return data;
};

export const getSupplierById = async (id: string) => {
  const { data } = await api.get(`/api/suppliers/${id}`);
  return data;
};

export const createSupplier = async (formData: SupplierFormValues) => {
  const { data } = await api.post("/api/suppliers", formData);
  return data;
};

export const updateSupplier = async (id: string, formData: Partial<SupplierFormValues>) => {
  const { data } = await api.patch(`/api/suppliers/${id}`, formData);
  return data;
};

export const deleteSupplier = async (id: string) => {
  const { data } = await api.delete(`/api/suppliers/${id}`);
  return data;
};

export const getSupplierHistory = async (id: string) => {
  const { data } = await api.get(`/api/suppliers/${id}/history`);
  return data;
};

export const addStock = async (formData: AddStockFormData) => {
  const { data } = await api.post("/api/suppliers/add-stock", formData);
  return data;
};
