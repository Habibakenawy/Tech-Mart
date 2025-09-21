import { SubcategoryI } from "./subCategory";
import { CategoryI } from "./category";
import { BrandI } from "./brand";

export interface AddToCartResponse{
  status: string
  message: string
  numOfCartItems: number
  cartId: string
  data: CartResponseData<string>
}


export interface GetLoggedUserCart{
    status:string
    message:string
    numOfCartItems:number
    cartId:string
    data:CartResponseData<ProductI>
}




export interface CartResponseData<T> {
  _id: string
  cartOwner: string
  products: CartProductI<T>[]
  createdAt: string
  updatedAt: string
  totalCartPrice: number
}

export interface CartProductI<T>{
  count: number
  _id: string
  product: T
  price: number
}

export interface ProductI {
  subcategory: SubcategoryI[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: CategoryI;
  brand: BrandI;
  ratingsAverage: number;
  id: string;
}