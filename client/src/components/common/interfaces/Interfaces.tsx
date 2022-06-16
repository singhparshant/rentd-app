export interface Product {
  name: String;
  monthlyPrice: String;
  discount: Number;
  deposit: Number;
  maxRentDuration: Number;
  description: String;
  avgRating: Number;
  numberRatings: Number;
  category: String;
}

export interface Order {
  amount: Number;
  monthlyPrice: Number;
  paymentMethod: String;
  Status: String;
}
