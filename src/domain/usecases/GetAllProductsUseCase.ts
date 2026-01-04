/**
 * GetAllProducts Use Case - Single Responsibility Principle
 * Each use case has one specific purpose
 */
import { Product } from '../entities/Product';
import { IProductRepository } from '../repositories/IProductRepository';

export class GetAllProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.getAll();
  }
}
