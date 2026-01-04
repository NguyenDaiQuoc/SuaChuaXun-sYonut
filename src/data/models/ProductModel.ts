/**
 * Product Data Model - Maps between database and domain
 */
import { Product, Topping } from '../../domain/entities/Product';

export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  toppings?: ToppingDTO[];
}

export interface ToppingDTO {
  id: string;
  name: string;
  price: number;
}

export class ProductMapper {
  static toDomain(dto: ProductDTO): Product {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      price: dto.price,
      imageUrl: dto.image_url,
      category: dto.category,
      availableToppings: dto.toppings?.map(ProductMapper.toppingToDomain) || [],
    };
  }

  static toDTO(product: Product): ProductDTO {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.imageUrl,
      category: product.category,
      toppings: product.availableToppings.map(ProductMapper.toppingToDTO),
    };
  }

  private static toppingToDomain(dto: ToppingDTO): Topping {
    return {
      id: dto.id,
      name: dto.name,
      price: dto.price,
    };
  }

  private static toppingToDTO(topping: Topping): ToppingDTO {
    return {
      id: topping.id,
      name: topping.name,
      price: topping.price,
    };
  }
}
