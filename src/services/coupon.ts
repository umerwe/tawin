import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderAmount: number;
  usageLimit: number;
  usedCount: number;
  expiryDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CouponFormData {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderAmount: number;
  usageLimit: number;
  expiryDate: string;
}

export interface CouponStats {
  totalCoupons: number;
  activeCoupons: number;
  totalUsageCount: number;
  expiredCoupons: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}


// Admin Coupon APIs
export const getCouponsAdmin = async (params?: PaginationParams) => {
  const { data } = await api.get("/api/coupons/admin", { params });
  return data;
};

export const createCouponAdmin = async (formData: CouponFormData): Promise<Coupon> => {
  const { data } = await api.post("/api/coupons/admin", formData);
  return data;
};

export const getCouponStatsAdmin = async (): Promise<CouponStats> => {
  const { data } = await api.get("/api/coupons/admin/stats");
  return data.data;
};

export const updateCouponAdmin = async (id: string, formData: Partial<CouponFormData>): Promise<Coupon> => {
  const { data } = await api.patch(`/api/coupon/admin/${id}`, formData);
  return data;
};

export const deleteCouponAdmin = async (id: string): Promise<void> => {
  await api.delete(`/api/coupons/admin/${id}`);
};

export const toggleCouponStatusAdmin = async (id: string): Promise<Coupon> => {
  const { data } = await api.patch(`/api/coupon/admin/toggle-status/${id}`);
  return data;
};

// User Coupon APIs
export interface ValidateCouponRequest {
  code: string;
  amount: number;
}

export interface ValidateCouponResponse {
  isValid: boolean;
  discountAmount: number;
  finalAmount: number;
  message?: string;
}

export const validateCoupon = async (request: ValidateCouponRequest)=> {
  const { data } = await api.post("/api/coupons/validate", request);
  return data;
};