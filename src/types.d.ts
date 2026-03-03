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

interface ProductCardProps {
    id: number
    image: string
    images?: string[]
    title: string
    category?: string
    price: number
    originalPrice?: number
    rating?: number
    isNew?: boolean
    discount?: number
    isListView?: boolean
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

