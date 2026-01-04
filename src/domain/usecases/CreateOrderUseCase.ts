/**
 * CreateOrder Use Case
 */
import { Order } from '../entities/Order';
import { IOrderRepository } from '../repositories/IOrderRepository';

export class CreateOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    // Business logic validation
    if (orderData.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    if (orderData.totalAmount <= 0) {
      throw new Error('Order total must be greater than zero');
    }

    return await this.orderRepository.create(orderData);
  }
}
