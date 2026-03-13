interface CardProps {
  title: LocalizedString;
  subtitle: LocalizedString;
  value?: string;
  change: string;
  changeLabel?: LocalizedString;
  changeType: 'increase' | 'decrease';
  footerValue?: string;
  footerLabel?: LocalizedString;
}
interface LocalizedString {
  en: string;
  ar: string;
}

interface ProductCardProps {
  id: number;
  title: LocalizedString;
  category: LocalizedString;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  isNew?: boolean;
  discount?: number;
  description?: LocalizedString;
  measurements?: string;
  colors?: string[];
  reviews?: number;
  isListView?: boolean;
}

interface Subcategory {
  _id: string | number;
  parentId: number;
  title: LocalizedString;
  slug: string;
}

interface Category {
  _id: string;
  name: LocalizedString;
  subtitle: LocalizedString;
  slug: string;
  image: string;
  subcategories: Subcategory[];
}

interface Color {
  name: string
  image: string
  value: string
}

interface Review {
  id: number
  name: string
  rating: number
  date: string
  comment: string
  avatar: string
}

