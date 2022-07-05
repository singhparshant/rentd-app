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

export interface Order {
  _id: string;
  customer: Customer;
  totalAmount: number;
  monthlyPrice: number;
  orderItems: OrderItem[];
  paymentMethod: String;
  paymentId: Object;
  deliveryID: Object;
  Status: String;
}
export interface Filter {
  categories?: string[];
  monthlyPrice?: number;
  avgRating?: number;
  minDuration?: number;
  page?: number;
  limit?: number;
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
export interface Customer {}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  rentalDuration: number;
}
