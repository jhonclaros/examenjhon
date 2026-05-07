import { IsString, IsOptional, Min, IsMongoId, IsBoolean, IsInt } from 'class-validator';

export class UpdateProductoDto {
  @IsString()
  @IsOptional()
  Nombre?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  Precio?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  Stock?: number;

  @IsMongoId()
  @IsOptional()
  categoria?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
