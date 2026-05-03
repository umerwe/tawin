import api from "@/lib/axios";

export interface Notification {
  _id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getNotifications = async (params?: { page?: number; limit?: number }) => {
  const { data } = await api.get("/api/notifications", { params });
  return data;
};

export const markAllNotificationsAsRead = async (): Promise<any> => {
  const { data } = await api.patch("/api/notifications/read-all");
  return data;
};

export const markNotificationAsRead = async (id: string): Promise<any> => {
  const { data } = await api.patch(`/api/notifications/${id}/read`);
  return data;
};