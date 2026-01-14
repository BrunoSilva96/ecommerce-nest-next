import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { CreateProductUseCase } from './use-case/create-product.usecase';
import { DrizzleProductRepository } from './repositories/implementations/drizzle-product.repository';
import { UpdateProductUseCase } from './use-case/update-product.usecase';
import { ProductRepository } from './repositories/product.repository';
import { DeleteProductUseCase } from './use-case/delete-product.usecase';
import { SearchProductUseCase } from './use-case/search-product.usecase';
import { FindAllProductsUseCase } from './use-case/find-all-product.usecase';
import { FindProductByCategoryUseCase } from './use-case/find-products-by-category.usecase';
import { ListProductUseCase } from './use-case/list-products.usecase.dto';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    SearchProductUseCase,
    FindAllProductsUseCase,
    FindProductByCategoryUseCase,
    ListProductUseCase,
    {
      provide: ProductRepository,
      useClass: DrizzleProductRepository,
    },
  ],
})
export class ProductModule {}
