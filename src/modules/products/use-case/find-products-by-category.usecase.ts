import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class FindProductByCategoryUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(category: string) {
    if (!category) {
      return [];
    }

    return this.productRepository.findByCategory(category);
  }
}
