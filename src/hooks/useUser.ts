import { useQuery } from "@tanstack/react-query";
import { getUserStats } from "@/services/user";

export const useUserStats = (filter : { filter : string }) => {
  return useQuery({
    queryKey: ["userStats", filter],
    queryFn: () => getUserStats(filter),
    staleTime: 5 * 60 * 1000,
  });
};