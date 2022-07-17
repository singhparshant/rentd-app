export interface Product {
  _id?: string;
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

export interface ShoppingCart {
  cart: OrderItem[];
}
export interface UserData {
  userName: string;
  role: String;
}

export interface Filter {
  categories?: string[];
  monthlyPrice?: number;
  avgRating?: number;
  minDuration?: number;
  page?: number;
  limit?: number;
  searchString?: string;
  sortBy?: string;
  hasDiscount?: boolean;
}

export interface Application {
  _id?: string;
  email: string;
  username: string;
  role: "customer" | "supplier";
  address: string;
  IBAN: string;
  codeOfConduct: string;
  status: "pending" | "accepted" | "rejected";
  KYCDocs: string[];
  createdAt?: string;
}
export interface Customer {}

export interface OrderItem {
  _id?: string;
  product: Product;
  quantity: number;
  duration: number;
  status?: "ordered" | "delivered" | "refunded" | "Cancelled";
  deliveryId?: string;
}

export interface Order {
  _id?: string;
  customerId: string;
  orderItems: OrderItem[];
}
