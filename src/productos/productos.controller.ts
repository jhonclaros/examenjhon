import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './schemas/producto.schema';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  public async create(@Body() dto: CreateProductoDto): Promise<Producto> {
    return this.productosService.CrearValidandoCategoria(dto);
  }

  @Get()
  public async findAll(
    @Query('incluirInactivos') incluirInactivos?: string,
    @Query('categoria') categoria?: string,
  ): Promise<Producto[]> {
    return this.productosService.ListarConFiltros(incluirInactivos, categoria);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Producto> {
    return this.productosService.ObtenerPoblado(id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateProductoDto): Promise<Producto> {
    return this.productosService.Actualizar(id, dto);
  }

  @Patch(':id/desactivar')
  public async desactivar(@Param('id') id: string): Promise<Producto> {
    return this.productosService.CambiarEstadoActivo(id);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<any> {
    return this.productosService.EliminarFisico(id);
  }
}