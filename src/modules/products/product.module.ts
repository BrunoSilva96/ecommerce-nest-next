import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { CreateProductUseCase } from './use-case/create-product.usecase';
import { DrizzleProductRepository } from './repositories/implementations/drizzle-product.repository';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    {
      provide: 'ProductRepository',
      useClass: DrizzleProductRepository,
    },
  ],
})
export class ProductModule {}
