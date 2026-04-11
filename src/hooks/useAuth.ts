import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser, signUpUser, getUserProfile, updateUserProfile, getAdminUsers, verifyUser } from "@/services/auth";
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
