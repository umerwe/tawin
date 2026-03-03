export interface Color {
  name: string
  value: string
  image?: string
}

export interface Product {
  id: number
  title: string
  description?: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  reviews?: number
  measurements?: string
  colors?: Color[]
  remainingPieces?: number
  isNew?: boolean
  discount?: number
  category?: string
  rating?: number
}

export interface Review {
  id: number
  name: string
  rating: number
  date: string
  comment: string
  avatar: string
}
