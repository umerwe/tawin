import api from "@/lib/axios";

export const getAdminSummary = async (filter: string) => {
  const { data } = await api.get("/api/admin/summary", {
    params: {
      filter,
    },
  });
  return data;
};
