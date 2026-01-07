import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateProductUseCase } from '../use-case/create-product.usecase';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { UpdateProductUseCase } from '../use-case/update-product.usecase';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
  ) {}

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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const product = await this.updateProductUseCase.execute(id, dto);

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      priceCents: product.priceCents,
      category: product.category,
      stock: product.stock,
      description: product.description,
      images: product.images,
      updatedAt: product.updatedAt,
    };
  }
}
