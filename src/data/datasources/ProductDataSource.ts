/**
 * Mock Product Data Source
 * In production, this would connect to Supabase/Firebase
 */
import { ProductDTO } from '../models/ProductModel';

export interface IProductDataSource {
  fetchAll(): Promise<ProductDTO[]>;
  fetchById(id: string): Promise<ProductDTO | null>;
  fetchByCategory(category: string): Promise<ProductDTO[]>;
}

export class MockProductDataSource implements IProductDataSource {
  private mockProducts: ProductDTO[] = [
    {
      id: '1',
      name: 'Classic Yogurt',
      description: 'Creamy and delicious classic yogurt',
      price: 35000,
      image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
      category: 'classic',
      toppings: [
        { id: 't1', name: 'Fresh Strawberries', price: 5000 },
        { id: 't2', name: 'Honey', price: 3000 },
        { id: 't3', name: 'Granola', price: 4000 },
      ],
    },
    {
      id: '2',
      name: 'Matcha Yogurt',
      description: 'Japanese green tea flavored yogurt',
      price: 45000,
      image_url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
      category: 'specialty',
      toppings: [
        { id: 't4', name: 'Red Bean', price: 6000 },
        { id: 't5', name: 'Mochi', price: 7000 },
        { id: 't2', name: 'Honey', price: 3000 },
      ],
    },
    {
      id: '3',
      name: 'Berry Blast',
      description: 'Mixed berries yogurt delight',
      price: 40000,
      image_url: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400',
      category: 'fruit',
      toppings: [
        { id: 't1', name: 'Fresh Strawberries', price: 5000 },
        { id: 't6', name: 'Blueberries', price: 6000 },
        { id: 't3', name: 'Granola', price: 4000 },
      ],
    },
    {
      id: '4',
      name: 'Tropical Paradise',
      description: 'Mango and passion fruit yogurt',
      price: 42000,
      image_url: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400',
      category: 'fruit',
      toppings: [
        { id: 't7', name: 'Coconut Flakes', price: 5000 },
        { id: 't8', name: 'Chia Seeds', price: 4000 },
        { id: 't2', name: 'Honey', price: 3000 },
      ],
    },
  ];

  async fetchAll(): Promise<ProductDTO[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.mockProducts;
  }

  async fetchById(id: string): Promise<ProductDTO | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return this.mockProducts.find((p) => p.id === id) || null;
  }

  async fetchByCategory(category: string): Promise<ProductDTO[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return this.mockProducts.filter((p) => p.category === category);
  }
}
