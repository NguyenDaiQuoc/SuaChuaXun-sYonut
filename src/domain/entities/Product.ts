/**
 * Product Entity - Core business object
 * Following Clean Architecture principles
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  availableToppings: Topping[];
}

export interface Topping {
  id: string;
  name: string;
  price: number;
}
