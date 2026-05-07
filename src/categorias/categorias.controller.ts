import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './schemas/categoria.schema';

@Controller('categorias')
export class CategoriasController {
  constructor(
    private readonly categoriasService: CategoriasService,
  ) {}

  @Post()
  public async create(@Body() createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriasService.Crear(createCategoriaDto);
  }

  @Get()
  public async findAll(): Promise<Categoria[]> {
    return this.categoriasService.ListarTodas();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Categoria> {
    return this.categoriasService.BuscarPorId(id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    return this.categoriasService.Actualizar(id, updateCategoriaDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<Categoria> {
    return this.categoriasService.Eliminar(id);
  }
}
