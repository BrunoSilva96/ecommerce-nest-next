import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';

export interface ListProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

@Injectable()
export class ListProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(params: ListProductsParams) {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit =
      params.limit && params.limit > 0 && params.limit <= 50
        ? params.limit
        : 12;

    return this.productRepository.list({
      ...params,
      page,
      limit,
    });
  }
}
