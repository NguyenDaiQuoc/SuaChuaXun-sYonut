/**
 * Order Repository Interface
 */
import { Order } from '../entities/Order';

export interface IOrderRepository {
  create(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order>;
  getById(id: string): Promise<Order | null>;
  getByCustomerEmail(email: string): Promise<Order[]>;
}
