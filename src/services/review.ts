import api from "@/lib/axios";

export const getProductReviews = async (productId: string) => {
  const { data } = await api.get(`/api/reviews/product/${productId}`);
  return data.data;
};

export const createReview = async (reviewData: {
  product: string;
  rating: number;
  comment: string;
}) => {
  const { data } = await api.post("/api/reviews", reviewData);
  return data;
};