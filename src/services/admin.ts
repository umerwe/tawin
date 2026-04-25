import api from "@/lib/axios";

export const getAdminSummary = async (period: string) => {
  const { data } = await api.get("/api/admin/summary", {
    params: {
      period,
    },
  });
  return data;
};
