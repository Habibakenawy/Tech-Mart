import { ProductI } from "./product";

export interface addToWishlistResponse {
  status: string;
  message: string;
  data: string[]; 
}

export interface GetLoggedUserWishlistResponse {
  status: string; 
  count: number;
  data: ProductI[];
}


export interface removeFromWishlistResponse {
  status: string;
  message: string;
  data: string[]; 
}