export interface Product {
  _id: string;
  supplierId: string;
  name: string;
  monthlyPrice: string;
  discount: number;
  deposit: number;
  minDuration: number;
  description: string;
  avgRating: number;
  numberRatings: number;
  category: string;
  productImages: string[];
}

export interface OrderItemType {
  productId: string;
  quantity: number;
  rentalDuration: number;
}

export interface Order {
  customerId: string;
  amount: number;
  monthlyPrice: number;
  orderItems: OrderItemType[];
  paymentMethod: string;
  paymentID: string;
  deliveryID: string;
  status: String;
}

export interface Filter {
  categories?: string[];
  monthlyPrice?: number;
  reviewed?: boolean;
  minDuration?: number;
}

export interface UserData {
  userName: string;
  role: String;
}
