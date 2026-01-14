import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductUseCase } from '../use-case/create-product.usecase';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { UpdateProductUseCase } from '../use-case/update-product.usecase';
import { DeleteProductUseCase } from '../use-case/delete-product.usecase';
import { SearchProductUseCase } from '../use-case/search-product.usecase';
import { FindAllProductsUseCase } from '../use-case/find-all-product.usecase';
import { FindProductByCategoryUseCase } from '../use-case/find-products-by-category.usecase';
import { ListProductsDto } from '../dto/list-products.dto';
import { ListProductUseCase } from '../use-case/list-products.usecase.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly searchProductUseCase: SearchProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly findProductByCategoryUseCase: FindProductByCategoryUseCase,
    private readonly listProductUseCase: ListProductUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    const product = await this.createProductUseCase.execute(dto);

    return {
      id: product.id,
      name: product.name,
      priceCents: product.priceCents,
      slug: product.slug,
      description: product.description,
      status: product.status,
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
      status: product.status,
      stock: product.stock,
      description: product.description,
      images: product.images,
      updatedAt: product.updatedAt,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteProductUseCase.execute(id);
    return { message: 'Produto deletado com sucesso' };
  }

  @Get()
  async search(@Query('search') search?: string) {
    if (search) {
      return this.searchProductUseCase.execute(search);
    }
  }

  @Get()
  findAll() {
    return this.findAllProductsUseCase.execute();
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.findProductByCategoryUseCase.execute(category);
  }

  @Get()
  list(@Query() query: ListProductsDto) {
    return this.listProductUseCase.execute({
      page: query.page ? Number(query.page) : undefined,
      limit: query.limit ? Number(query.limit) : undefined,
      category: query.category,
      minPrice: query.minPrice ? Number(query.minPrice) : undefined,
      maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
    });
  }
}
