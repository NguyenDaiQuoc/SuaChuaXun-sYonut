/**
 * CartItem Entity
 */
import { Product, Topping } from './Product';

export interface CartItem {
  id: string;
  product: Product;
  selectedToppings: Topping[];
  quantity: number;
  totalPrice: number;
}
