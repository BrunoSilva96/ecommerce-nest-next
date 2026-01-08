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
}
