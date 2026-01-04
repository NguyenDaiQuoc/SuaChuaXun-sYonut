/**
 * Product Repository Interface - Dependency Inversion Principle
 * Domain layer defines the contract, infrastructure implements it
 */
import { Product } from '../entities/Product';

export interface IProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  getByCategory(category: string): Promise<Product[]>;
}
