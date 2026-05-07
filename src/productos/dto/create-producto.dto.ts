import { IsString, IsNotEmpty, Min, IsMongoId, IsBoolean, IsOptional, IsInt } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @IsInt()
  @Min(0)
  Precio: number;

  @IsInt()
  @Min(0)
  Stock: number;

  @IsMongoId()
  @IsNotEmpty()
  categoria: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
