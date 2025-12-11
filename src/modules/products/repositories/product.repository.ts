import { ProductEntity } from '../entities/product.entity';

export abstract class ProductRepository {
  abstract findByName(name: string): Promise<ProductEntity | null>;

  abstract create(data: {
    name: string;
    slug?: string;
    priceCents: number;
    description: string;
    stock?: number;
    category?: string;
    images?: string[];
    createdAt: Date;
  }): Promise<ProductEntity>;
}
