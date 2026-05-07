import { IsString, IsOptional, MaxLength, IsInt } from 'class-validator';

export class UpdateCategoriaDto {
  @IsString()
  @IsOptional()
  Nombre?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  Descripcion?: string;

  @IsInt()
  @IsOptional()
  IdCategoria?: number;
}