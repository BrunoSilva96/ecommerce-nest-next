import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: string, dto: UpdateProductDto): Promise<ProductEntity> {
    return this.productRepository.update(id, dto);
  }
}
