interface CardProps {
  title: string;
  subtitle: string;
  value?: string;
  change: string;
  changeLabel?: string;
  changeType: 'increase' | 'decrease';
  footerValue?: string;
  footerLabel?: string;
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

interface Category {
  id : number;
  title: LocalizedString;
  subtitle: LocalizedString;
  image: string;
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

