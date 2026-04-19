import api from "@/lib/axios";

export const getAdminSummary = async () => {
  const { data } = await api.get("/api/admin/summary");
  return data;
};
