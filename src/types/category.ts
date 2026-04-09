export interface LocalizedString {
  en: string;
  ar: string;
}

export interface Category {
  _id: string;
  name: LocalizedString;
  slug: string;
  type: "category" | "subCategory";
  description: LocalizedString;
  thumbnail: string;
  icon: string;
  isActive: boolean;
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  subcategories?: Category[];
  parentCategory?: string;
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
}
