import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { CreateProductUseCase } from './use-case/create-product.usecase';
import { DrizzleProductRepository } from './repositories/implementations/drizzle-product.repository';
import { UpdateProductUseCase } from './use-case/update-product.usecase';
import { ProductRepository } from './repositories/product.repository';
import { DeleteProductUseCase } from './use-case/delete-product.usecase';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    {
      provide: ProductRepository,
      useClass: DrizzleProductRepository,
    },
  ],
})
export class ProductModule {}
