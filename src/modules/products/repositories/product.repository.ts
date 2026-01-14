import { ProductEntity } from '../entities/product.entity';

export interface ListProductsFilter {
  page: number;
  limit: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export abstract class ProductRepository {
  abstract findByName(name: string): Promise<ProductEntity | null>;

  abstract create(data: {
    name: string;
    slug?: string;
    priceCents: number;
    description: string;
    stock?: number;
    category?: string;
    status: boolean;
    images?: string[];
    createdAt?: Date;
  }): Promise<ProductEntity>;

  abstract update(
    id: string,
    data: {
      name?: string;
      slug?: string;
      priceCents?: number;
      description?: string;
      stock?: number;
      category?: string;
      status?: boolean;
      images?: string[];
      updatedAt?: Date;
    },
  ): Promise<ProductEntity>;

  abstract list(filters: ListProductsFilter): Promise<ProductEntity[]>;

  abstract delete(id: string): Promise<void>;

  abstract search(term: string): Promise<ProductEntity[]>;
  abstract findAll(limit?: number): Promise<ProductEntity[]>;
  abstract findByCategory(category: string): Promise<ProductEntity[]>;
}
