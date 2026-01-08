import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name  is required' })
  @MaxLength(180, { message: 'Name must be at most 180 characters' })
  name: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must use lowercase letters, numbers and dashes',
  })
  slug?: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0.01, { message: 'Price must be greater than 0' })
  @IsNotEmpty({ message: 'Price is required' })
  priceCents: number;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({
    message: 'Description is required',
  })
  description: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;

  @IsOptional()
  @IsArray()
  @IsUrl(undefined, { each: true })
  images?: string[];
}
