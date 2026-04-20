import { getAdminSummary } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminSummary = (filter: string) => {
  return useQuery({
    queryKey: ["admin-summary", filter],
    queryFn: () => getAdminSummary(filter),
  });
};
