export interface CartResponse{
  status: string
  message: string
  numOfCartItems: number
  cartId: string
  data: CartResponseData
}

export interface CartResponseData {
  _id: string
  cartOwner: string
  products: CartProductI[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface CartProductI {
  count: number
  _id: string
  product: string
  price: number
}
