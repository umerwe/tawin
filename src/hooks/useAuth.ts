import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser, signUpUser, getUserProfile, updateUserProfile, getAdminUsers, verifyUser, addAddress, getAllAddresses, deleteAddress, updateAddress } from "@/services/auth";
import { toast } from "sonner";
import { Signup } from "@/validations/auth";

export const useLogin = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token!);
      toast("Login Successfully");
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Please try again.");
    },
  });

  return mutation;
};

export const useSignup = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data: Signup) => {
      localStorage.setItem("token", (data as any).token);
      toast("Account created successfully!");
      router.push("/");
    },
    onError: (error: any) => {
      console.log(error);
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

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ["adminUsers"],
    queryFn: getAdminUsers,
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
