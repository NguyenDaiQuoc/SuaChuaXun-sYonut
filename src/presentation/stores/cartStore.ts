/**
 * Cart Store - State Management with Zustand
 * Following Single Responsibility Principle
 */
import { create } from 'zustand';
import { CartItem } from '../../domain/entities/CartItem';
import { Product, Topping } from '../../domain/entities/Product';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, selectedToppings: Topping[], quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const calculateItemPrice = (product: Product, toppings: Topping[], quantity: number): number => {
  const toppingsPrice = toppings.reduce((sum, t) => sum + t.price, 0);
  return (product.price + toppingsPrice) * quantity;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product, selectedToppings, quantity) => {
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      selectedToppings,
      quantity,
      totalPrice: calculateItemPrice(product, selectedToppings, quantity),
    };

    set((state) => ({
      items: [...state.items, newItem],
    }));
  },

  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },

  updateQuantity: (itemId, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity,
              totalPrice: calculateItemPrice(item.product, item.selectedToppings, quantity),
            }
          : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  },

  getTotalItems: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
