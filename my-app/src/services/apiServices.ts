import { SingleProductResponse, ProductResponse, SingleBrandResponse, SingleCategoryResponse } from "@/types/responses";
import { BrandResponse } from "@/types/responses";
import {
  AddToCartResponse,
  GetLoggedUserCart,
  userAddressI,
  RemoveCartResponse,
  ClearCartResponse,
  UpdateCartQuantityResponse,
  CheckoutSessionResponse,
  AddAddressResponse,
  CashOrderResponse,
  LoginResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  VerifyResetCodeResponse,
  GetLoggedUserWishlistResponse,
  addToWishlistResponse,
  removeFromWishlistResponse,
} from "@/interfaces";
import { CategoryResponse } from "@/types/responses";

class ApiServices {
  #baseUrl: string;

  constructor() {
    this.#baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  }

  #getHeaders(token?: string) {
    return {
      "Content-Type": "application/json",
      ...(token ? { token } : {}),
    };
  }

  async getProduct(id: string): Promise<SingleProductResponse> {
    const res = await fetch(this.#baseUrl + `api/v1/products/` + id);
    if (!res.ok) {
      throw new Error("Failed to fetch product. Please try again.");
    }
    return res.json();
  }

  async getProducts(): Promise<ProductResponse> {
    return await fetch(this.#baseUrl + "api/v1/products", {
      next: { revalidate: 5 },
      cache: "no-cache",
    }).then((res) => res.json());
  }

  async addToCart(productId: string, token: string): Promise<AddToCartResponse> {
    const res = await fetch(this.#baseUrl + `api/v1/cart`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: this.#getHeaders(token),
    });

    if (!res.ok) {
      throw new Error(`Failed to add product to cart: ${res.statusText}`);
    }

    return res.json();
  }

  async getLoggedUserCart(token: string): Promise<GetLoggedUserCart> {
    return await fetch(this.#baseUrl + "api/v1/cart", {
      headers: this.#getHeaders(token),
    }).then((res) => res.json());
  }

  async removeCartComponent(cartId: string, token: string): Promise<RemoveCartResponse> {
    return await fetch(this.#baseUrl + "api/v1/cart/" + cartId, {
      method: "DELETE",
      headers: this.#getHeaders(token),
    }).then((res) => res.json());
  }

  async clearCart(token: string): Promise<ClearCartResponse> {
    return await fetch(this.#baseUrl + "api/v1/cart/", {
      method: "DELETE",
      headers: this.#getHeaders(token),
    }).then((res) => res.json());
  }

  async updateCartQuantity(cartId: string, count: number, token: string): Promise<UpdateCartQuantityResponse> {
    return await fetch(this.#baseUrl + "api/v1/cart/" + cartId, {
      method: "PUT",
      body: JSON.stringify({ count }),
      headers: this.#getHeaders(token),
    }).then((res) => res.json());
  }

  async checkOutSession(
    cartId: string,
    token: string,
    details?: string,
    phone?: string,
    city?: string
  ): Promise<CheckoutSessionResponse> {
    return await fetch(
      this.#baseUrl + "api/v1/orders/checkout-session/" + cartId + "?url=http://localhost:3000",
      {
        method: "POST",
        body: JSON.stringify({
          shippingAddress: { details, phone, city },
        }),
        headers: this.#getHeaders(token),
      }
    ).then((res) => res.json());
  }

  async addAddresses(userAddress: userAddressI, token: string): Promise<AddAddressResponse> {
    return await fetch(this.#baseUrl + "api/v1/addresses", {
      method: "POST",
      body: JSON.stringify({
        name: userAddress.name,
        details: userAddress.details,
        phone: userAddress.phone,
        city: userAddress.city,
      }),
      headers: this.#getHeaders(token),
    }).then((res) => res.json());
  }

  async cashOrder(cartId: string, token: string, details?: string, phone?: string, city?: string): Promise<CashOrderResponse> {
    return await fetch(this.#baseUrl + "api/v1/orders/" + cartId, {
      method: "POST",
      body: JSON.stringify({
        shippingAddress: { details, phone, city },
      }),
      headers: this.#getHeaders(token),
    }).then((res) => res.json());
  }


  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(this.#baseUrl + "api/v1/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: this.#getHeaders(),
    });

    if (!res.ok) {
      throw new Error("Login failed. Please check your credentials.");
    }

    return res.json();
  }

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    return await fetch(this.#baseUrl + "api/v1/auth/forgotPasswords", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: this.#getHeaders(),
    }).then((res) => res.json());
  }

  async getCategories(): Promise<CategoryResponse> {
    return await fetch(this.#baseUrl + "api/v1/categories", {
      next: { revalidate: 5 },
      cache: "no-cache",
    }).then((res) => res.json());
  }

  async getCategory(id: string): Promise<SingleCategoryResponse> {
    const res = await fetch(this.#baseUrl + `api/v1/categories/` + id);
    if (!res.ok) {
      throw new Error("Failed to fetch category. Please try again.");
    }
    return res.json();
  }

  async getBrands(): Promise<BrandResponse> {
    return await fetch(this.#baseUrl + "api/v1/brands", {
      next: { revalidate: 5 },
      cache: "no-cache",
    }).then((res) => res.json());
  }

  async getBrand(id: string): Promise<SingleBrandResponse> {
    const res = await fetch(this.#baseUrl + `api/v1/brands/` + id);
    if (!res.ok) {
      throw new Error("Failed to fetch brand. Please try again.");
    }
    return res.json();
  }

  async resetPassword(email: string, newPassword: string): Promise<ResetPasswordResponse> {
    return await fetch(this.#baseUrl + "api/v1/auth/resetPassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    }).then((res) => res.json());
  }

  async verifyResetCode(resetCode: string): Promise<VerifyResetCodeResponse> {
    return await fetch(this.#baseUrl + "api/v1/auth/verifyResetCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetCode }),
    }).then((res) => res.json());
  }
   async getLoggedUserWishlist(token: string): Promise<GetLoggedUserWishlistResponse> {
    return await fetch(this.#baseUrl + "api/v1/wishlist", {
      headers: this.#getHeaders(token),
    }).then((res) => res.json());
  }

   async addToWishList(productId: string, token: string): Promise<addToWishlistResponse> {
    const res = await fetch(this.#baseUrl + `api/v1/wishlist`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: this.#getHeaders(token),
    });

    if (!res.ok) {
      throw new Error(`Failed to add product to cart: ${res.statusText}`);
    }

    return res.json();
  }

  async removeWishlist(productId: string, token: string): Promise<removeFromWishlistResponse> {
    return await fetch(this.#baseUrl + "api/v1/wishlist/" + productId, {
      method: "DELETE",
      headers: this.#getHeaders(token),
    }).then((res) => res.json());
  }
  


}


export const apiServices = new ApiServices();
