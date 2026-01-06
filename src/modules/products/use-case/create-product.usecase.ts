import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(dto: CreateProductDto): Promise<ProductEntity> {
    return this.productRepository.create(dto);
  }
}
