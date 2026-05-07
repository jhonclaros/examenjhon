import { IsString, IsNotEmpty, IsOptional, MaxLength, IsInt } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  Descripcion?: string;

  @IsInt()
  @IsNotEmpty()
  IdCategoria: number;
}
