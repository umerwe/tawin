import { getAdminSummary } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminSummary = () => {
  return useQuery({
    queryKey: ["admin-summary"],
    queryFn: getAdminSummary,
  });
};
