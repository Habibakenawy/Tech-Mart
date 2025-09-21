import { SingleProductResponse } from "@/types/responses";
import { ProductResponse } from "@/types/responses";
import { CartResponse } from "@/interfaces";
class ApiServices {
     baseUrl: string;

     constructor() {
         this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
     }
         
     async getProduct(id: string): Promise<SingleProductResponse> {
        try {
            const res = await fetch(this.baseUrl + `api/v1/products/` + id);
            if (!res.ok) {
                throw new Error("Failed to fetch product. Please try again.");
            }
            const data: SingleProductResponse = await res.json();
            return data;
        } catch (err: any) {
            throw err;
        }
    }
    
     async getProducts(): Promise<ProductResponse> {
        try {
            const res = await fetch(this.baseUrl + `api/v1/products/`);
            if (!res.ok) {
                throw new Error("Failed to fetch products. Please try again.");
            }
            const data: ProductResponse = await res.json();
            return data;
        } catch (err: any) {
            throw err;
        }
    }

    getHeaders(){
      return {
        "Content-Type":"application/json",
        token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2QxN2JlNjc4NjgxOTcyNTFjNDY0NyIsIm5hbWUiOiJIYWJpYmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1ODQ2NTcyMywiZXhwIjoxNzY2MjQxNzIzfQ.XfStiN7sIjfjN5NJpG9q3vfg5-83go2c-1QBgTqfKoU'
      }
    }

   async addToCart(productId: string): Promise<CartResponse> {
    try {
        const res = await fetch(this.baseUrl + `api/v1/cart`, {
            method: 'post',
            body: JSON.stringify({
                productId
            }),
            headers: this.getHeaders()
        });

        if (!res.ok) {
            throw new Error(`Failed to add product to cart: ${res.statusText}`);
        }

        const data: CartResponse = await res.json();
        return data; 
    } catch (err: any) {
        throw err; 
    }
}
}


export const apiServices = new ApiServices()
