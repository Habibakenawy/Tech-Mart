 export interface userAddressI {
 name:string,
 details:string,
 phone:string,
 city:string
}
export interface AddAddressResponse {
  message: string;
  data: {
    _id: string;
    name: string;
    details: string;
    phone: string;
    city: string;
  };
}