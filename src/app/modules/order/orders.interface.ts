export type OrderType = {
  name: string;
  brand: string;
  price: number;
  category: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
