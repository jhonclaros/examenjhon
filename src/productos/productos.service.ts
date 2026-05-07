import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Producto } from './schemas/producto.schema';
import { Model, isValidObjectId } from 'mongoose';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Categoria } from '../categorias/schemas/categoria.schema';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name) private productoModel: Model<Producto>,
    @InjectModel(Categoria.name) private categoriaModel: Model<Categoria>,
  ) {}

  public async CrearValidandoCategoria(dto: CreateProductoDto): Promise<Producto> {
    if (!isValidObjectId(dto.categoria)) {
      throw new BadRequestException('ID de categoría inválido');
    }
    const categoria = await this.categoriaModel.findById(dto.categoria);
    if (!categoria) {
      throw new NotFoundException('La categoría no existe');
    }

    try {
      return await this.productoModel.create(dto);
    } catch (error) {
      throw new ConflictException('El producto ya existe');
    }
  }

  public async ListarConFiltros(incluirInactivos?: string, categoria?: string): Promise<Producto[]> {
    const filtro: any = {};

    if (incluirInactivos !== 'true') {
      filtro.activo = true;
    }

    if (categoria) {
      filtro.categoria = categoria;
    }

    return this.productoModel.find(filtro).populate('categoria', 'Nombre');
  }

  public async ObtenerPoblado(id: string): Promise<Producto> {
    if (!isValidObjectId(id)) throw new BadRequestException('ID inválido');
    
    const producto = await this.productoModel
      .findById(id)
      .populate('categoria', 'Nombre');

    if (!producto) throw new NotFoundException('Producto no existe');

    return producto;
  }

  public async Actualizar(id: string, dto: UpdateProductoDto): Promise<Producto> {
    if (!isValidObjectId(id)) throw new BadRequestException('ID inválido');
    
    if (dto.categoria) {
      if (!isValidObjectId(dto.categoria)) throw new BadRequestException('ID de categoría inválido');
      const categoria = await this.categoriaModel.findById(dto.categoria);
      if (!categoria) {
        throw new NotFoundException('La nueva categoría no existe');
      }
    }

    const producto = await this.productoModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!producto) throw new NotFoundException('Producto no existe');

    return producto;
  }

  public async CambiarEstadoActivo(id: string): Promise<Producto> {
    if (!isValidObjectId(id)) throw new BadRequestException('ID inválido');
    
    const producto = await this.productoModel.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true },
    );

    if (!producto) throw new NotFoundException('Producto no existe');

    return producto;
  }

  public async EliminarFisico(id: string): Promise<any> {
    if (!isValidObjectId(id)) throw new BadRequestException('ID inválido');
    
    const producto = await this.productoModel.findByIdAndDelete(id);

    if (!producto) throw new NotFoundException('Producto no existe');

    return { message: 'Producto eliminado' };
  }
}