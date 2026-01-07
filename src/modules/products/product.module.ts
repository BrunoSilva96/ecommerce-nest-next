import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { CreateProductUseCase } from './use-case/create-product.usecase';
import { DrizzleProductRepository } from './repositories/implementations/drizzle-product.repository';
import { UpdateProductUseCase } from './use-case/update-product.usecase';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    UpdateProductUseCase,
    {
      provide: 'ProductRepository',
      useClass: DrizzleProductRepository,
    },
  ],
})
export class ProductModule {}
