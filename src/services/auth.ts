import api from "@/lib/axios";
import { Address, Login, Signup } from "@/validations/auth";

export const loginUser = async (credentials: Login) => {
  const { data } = await api.post("/api/auth/login", credentials);
  return data.data;
};

export const signUpUser = async (credentials: Signup) => {
  const { data } = await api.post("/api/auth/register", credentials);
  return data.data;
};

export const getUserProfile = async () => {
  const { data } = await api.get("/api/users/me");
  return data;
};

export const updateUserProfile = async (data: File | { firstName: string; lastName: string; username: string }) => {
  if (data instanceof File) {
    const formData = new FormData();
    formData.append('profileImage', data);
    const response = await api.patch("/api/users/profile-picture", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } else {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('username', data.username);
    const response = await api.patch("/api/users/profile-picture", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

export const getAdminUsers = async (params?: { status?: string; page?: number; search?: string }) => {
  const { data } = await api.get("/api/admin/users", { params });
  return data;
};

export const verifyUser = async (userId: string) => {
  const { data } = await api.patch(`/api/admin/users/${userId}/verify`);
  return data;
};

export const addAddress = async (addressData: Address) => {
  const { data } = await api.post("/api/addresses", addressData);
  return data;
};

export const getAllAddresses = async () => {
  const { data } = await api.get("/api/addresses");
  return data.data;
};

export const deleteAddress = async (addressId: string) => {
  const { data } = await api.delete(`/api/addresses/${addressId}`);
  return data;
};

export const updateAddress = async ({ id, data }: { id: string; data: Address }) => {
  const response = await api.patch(`/api/addresses/${id}`, data);
  return response.data;
};
