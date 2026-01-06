import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductUseCase } from '../use-case/create-product.usecase';
import { CreateProductDto } from '../dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    const product = await this.createProductUseCase.execute(dto);

    return {
      id: product.id,
      name: product.name,
      priceCents: product.priceCents,
      description: product.description,
      stock: product.stock,
      category: product.category,
      images: product.images,
      createAt: product.createdAt,
    };
  }
}
