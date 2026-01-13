import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class SearchProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(term: string) {
    if (!term || term.trim().length < 2) {
      return [];
    }

    return this.productRepository.search(term);
  }
}
