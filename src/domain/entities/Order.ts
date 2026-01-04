/**
 * Order Entity
 */
import { CartItem } from './CartItem';

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  status: OrderStatus;
  createdAt: Date;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}
