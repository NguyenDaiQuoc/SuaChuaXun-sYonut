/**
 * Product Repository Implementation
 * Implements the domain repository interface
 */
import { Product } from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { IProductDataSource } from '../datasources/ProductDataSource';
import { ProductMapper } from '../models/ProductModel';

export class ProductRepository implements IProductRepository {
  constructor(private dataSource: IProductDataSource) {}

  async getAll(): Promise<Product[]> {
    const dtos = await this.dataSource.fetchAll();
    return dtos.map(ProductMapper.toDomain);
  }

  async getById(id: string): Promise<Product | null> {
    const dto = await this.dataSource.fetchById(id);
    return dto ? ProductMapper.toDomain(dto) : null;
  }

  async getByCategory(category: string): Promise<Product[]> {
    const dtos = await this.dataSource.fetchByCategory(category);
    return dtos.map(ProductMapper.toDomain);
  }
}
