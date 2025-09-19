import { ProductI, CategoryI, BrandI, SubcategoryI } from '@/interfaces';
import { APiResponse } from '@/interfaces/api';

export type ProductResponse = APiResponse<ProductI>;
export type CategoryResponse = APiResponse<CategoryI>;
export type BrandResponse = APiResponse<BrandI>;
export type SubcategoryResponse = APiResponse<SubcategoryI>;

export type SingleBrandResponse={
    data:BrandI;
}

export type SingleCategoryResponse={
    data:CategoryI;
}

export type SingleProductResponse={
    data:ProductI;
}


