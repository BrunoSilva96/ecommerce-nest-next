import { ProductEntity } from '../../entities/product.entity';
import { ProductRepository } from '../product.repository';
import { db } from 'src/database/drizzle';
import { eq, ilike, or } from 'drizzle-orm';
import { products } from 'src/database/schemas/products';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProductDto } from '../../dto/update-product.dto';

@Injectable()
export class DrizzleProductRepository implements ProductRepository {
  async create(data: {
    name: string;
    slug?: string;
    priceCents: number;
    description: string;
    status: boolean;
    stock?: number;
    category?: string;
    images?: string[];
  }): Promise<ProductEntity> {
    try {
      const [row] = await db
        .insert(products)
        .values({
          name: data.name,
          slug: data.slug,
          priceCents: data.priceCents,
          description: data.description,
          status: data.status,
          stock: data.stock,
          category: data.category,
          images: data.images,
        })
        .returning();

      return new ProductEntity(row);
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (err?.code === '23505') {
        throw new ConflictException('Product name already exists');
      }
      throw err;
    }
  }
  async findByName(name: string): Promise<ProductEntity | null> {
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.name, name))
      .limit(1);

    const row = rows[0];
    return row ? new ProductEntity(row) : null;
  }
  async update(
    id: string,
    data: Partial<UpdateProductDto>,
  ): Promise<ProductEntity> {
    const [update] = await db
      .update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();

    if (!update) {
      throw new NotFoundException('Produto não encontrado');
    }

    return new ProductEntity(update);
  }

  async delete(id: string): Promise<void> {
    const existing = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (existing.length === 0) {
      throw new NotFoundException('Produto não encontrado');
    }

    await db.delete(products).where(eq(products.id, id));
  }

  async search(term: string): Promise<ProductEntity[]> {
    const rows = await db
      .select()
      .from(products)
      .where(
        or(
          ilike(products.name, `%${term}%`),
          ilike(products.slug, `%${term}%`),
        ),
      )
      .limit(20);

    return rows.map((row) => new ProductEntity(row));
  }

  async findAll(limit = 20): Promise<ProductEntity[]> {
    const rows = await db.select().from(products).limit(limit);

    return rows.map((row) => new ProductEntity(row));
  }

  async findByCategory(category: string): Promise<ProductEntity[]> {
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.category, category));

    return rows.map((row) => new ProductEntity(row));
  }
}
