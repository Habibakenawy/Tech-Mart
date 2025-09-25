export interface CashOrderResponse {
  message: string;
  data: {
    _id: string;
    totalOrderPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
  };
}
