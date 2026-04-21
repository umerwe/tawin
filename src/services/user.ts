import api from "@/lib/axios";

export const getUserStats = async ({filter}: {filter?: string}) => {
  const { data } = await api.get("/api/users/stats", { params: { filter } });
  return data;
};