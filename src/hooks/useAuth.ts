import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser, signUpUser, getUserProfile, updateUserProfile, getAdminUsers, verifyUser, addAddress, getAllAddresses, deleteAddress, updateAddress, signUpUserByAdmin, deleteUser } from "@/services/auth";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.removeItem("token");
      localStorage.removeItem("admin_token");

      if (data?.user?.role === "admin") {
        localStorage.setItem("admin_token", data.token!);
        router.replace("/admin");
      } else {
        localStorage.setItem("token", data.token!);
        router.replace("/");
      }

      toast.success("Logged in successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    },
  });

  return mutation;
};

export const useSignup = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      toast("Account created successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong.");
    },
  });
  return mutation;
};

export const useUserSignupByAdmin = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: signUpUserByAdmin,
    onSuccess: () => {
      toast("Account created successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong.");
    },
  });
  return mutation;
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast("User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete user.");
    },
  });
};

export const useAdminUsers = (params: { status?: string; page?: number; search?: string }) => {
  return useQuery({
    queryKey: ["adminUsers", params],
    queryFn: () => getAdminUsers(params),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export const useVerifyUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: verifyUser,
    onSuccess: () => {
      toast("User verification status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update verification status.");
    },
  });
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      toast("Address added successfully!");
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add address.");
    },
  });
};

export const useAllAddresses = () => {
  return useQuery({
    queryKey: ["userAddresses"],
    queryFn: getAllAddresses,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      toast("Address deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete address.");
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      toast("Address updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update address.");
    },
  });
};
