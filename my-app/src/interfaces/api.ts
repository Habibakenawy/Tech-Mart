export interface APiResponse<T>{
    results:number;
    metadata:{
        currentPage:number;
        numberOfPages:number;
        limit:number;
        nextPage?:number;
    };
    data: T[];
}