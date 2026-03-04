export interface Product {
  id: number
  title: LocalizedString;
  category: LocalizedString;
  description?: string
  price: number
  originalPrice?: number
  image: string
  reviews?: number
  measurements?: string
  colors?: string[]
  remainingPieces?: number
  isNew?: boolean
  discount?: number
  rating?: number,
  isListView?: boolean,
}

export interface Review {
  id: number
  name: LocalizedString
  rating: number
  date: string
  comment: LocalizedString
  avatar: string
}
