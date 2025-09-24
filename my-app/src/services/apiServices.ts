import { SingleProductResponse } from "@/types/responses";
import { ProductResponse } from "@/types/responses";
import { AddToCartResponse } from "@/interfaces";
import { GetLoggedUserCart } from "@/interfaces";
import { userAddressI } from "@/interfaces";
class ApiServices {
     #baseUrl: string;

     constructor() {
         this.#baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
     }
         
     async getProduct(id: string): Promise<SingleProductResponse> {
        try {
            const res = await fetch(this.#baseUrl + `api/v1/products/` + id);
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
        return await fetch(this.#baseUrl+"api/v1/products",{
          next:{
            revalidate:5
          },
          cache:"no-cache"
        }).then((res)=>res.json());
    }

    #getHeaders(){
      return {
        "Content-Type":"application/json",
        token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2QxN2JlNjc4NjgxOTcyNTFjNDY0NyIsIm5hbWUiOiJIYWJpYmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1ODQ2NTcyMywiZXhwIjoxNzY2MjQxNzIzfQ.XfStiN7sIjfjN5NJpG9q3vfg5-83go2c-1QBgTqfKoU'
      }
    }

   async addToCart(productId: string): Promise<AddToCartResponse> {
    try {
        const res = await fetch(this.#baseUrl + `api/v1/cart`, {
            method: 'post',
            body: JSON.stringify({
                productId
            }),
            headers: this.#getHeaders()
        });

        if (!res.ok) {
            throw new Error(`Failed to add product to cart: ${res.statusText}`);
        }

        const data: AddToCartResponse = await res.json();
        return data; 
    } catch (err: any) {
        throw err; 
    }
}

    async getLoggedUserCart():Promise<GetLoggedUserCart>{
        return await fetch(this.#baseUrl+"api/v1/cart",{
            headers:this.#getHeaders()
        }).then(res=>res.json());

    }

        async removeCartComponent(cartId:string):Promise<any>{
        return await fetch(this.#baseUrl+"api/v1/cart/"+cartId,{
            method:'DELETE',
            headers:this.#getHeaders()
        }).then(res=>res.json());

    }

            async clearCart():Promise<any>{
        return await fetch(this.#baseUrl+"api/v1/cart/",{
            method:'DELETE',
            headers:this.#getHeaders()
        }).then(res=>res.json());

    }

      async updateCartQuantity(cartId:string,count:number):Promise<any>{
        return await fetch(this.#baseUrl+"api/v1/cart/"+cartId,{
            method:'PUT',
            body: JSON.stringify({
                count
            }),
            headers:this.#getHeaders()
        }).then(res=>res.json());

    }


  async checkOutSession(cartId:string, details?: string, phone?: string, city?: string):Promise<any>{
        return await fetch(this.#baseUrl+"api/v1/orders/checkout-session/"+cartId+"?url=http://localhost:3000",{
            body:JSON.stringify({
            "shippingAddress":{
            "details": details,
            "phone": phone,
             "city": city
        }
            }),
            headers:this.#getHeaders(),
            method:"post"
        }
     ).then(res=>res.json())
      
}


     async addAddresses(userAddress:userAddressI):Promise<any>{


        return await fetch(this.#baseUrl+"api/v1/addresses",{
            body:JSON.stringify({
            "name": userAddress.name,
            "details": userAddress.details,
            "phone": userAddress.phone,
             "city": userAddress.city
        
            }),
            headers:this.#getHeaders(),
            method:"post"
        }
     ).then(res=>res.json())
}
}


export const apiServices = new ApiServices()
