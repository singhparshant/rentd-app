export interface Product {
  _id: string;
  supplierId: string;
  name: string;
  monthlyPrice: number;
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

export interface UserData {
  userName: string;
  role: String;
}

export interface Filter {
  categories?: string[];
  maxPrice?: Number;
  reviewed?: boolean;
  duration?: Number;
  page?: number;
  limit?: number;
  searchString?: string;
}

export interface Application {
  email: string;
  username: string;
  role: "customer" | "supplier";
  address: string;
  iban: string;
  codeOfConduct: string;
  status: "pending" | "accepted" | "rejected";
  KYCDocs: string[];
}
