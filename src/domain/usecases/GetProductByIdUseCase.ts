/**
 * GetProductById Use Case
 */
import { Product } from '../entities/Product';
import { IProductRepository } from '../repositories/IProductRepository';

export class GetProductByIdUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string): Promise<Product | null> {
    return await this.productRepository.getById(id);
  }
}
