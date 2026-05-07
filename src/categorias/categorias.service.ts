import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './schemas/categoria.schema';
import { Producto } from '../productos/schemas/producto.schema';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria.name) private categoriaModel: Model<Categoria>,
    @InjectModel(Producto.name) private productoModel: Model<Producto>,
  ) {}

  public async Crear(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const existe = await this.categoriaModel.findOne({ Nombre: createCategoriaDto.Nombre });
    if (existe) {
      throw new ConflictException('El nombre de la categoría ya existe');
    }
    const nueva = new this.categoriaModel(createCategoriaDto);
    return nueva.save();
  }

  public async ListarTodas(): Promise<Categoria[]> {
    return this.categoriaModel.find().exec();
  }

  public async BuscarPorId(id: string): Promise<Categoria> {
    if (!isValidObjectId(id)) throw new BadRequestException('ID inválido');
    const categoria = await this.categoriaModel.findById(id).exec();
    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    return categoria;
  }

  public async Actualizar(id: string, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    if (!isValidObjectId(id)) throw new BadRequestException('ID inválido');
    if (updateCategoriaDto.Nombre) {
      const existe = await this.categoriaModel.findOne({ Nombre: updateCategoriaDto.Nombre, _id: { $ne: id } });
      if (existe) throw new ConflictException('El nombre de la categoría ya existe');
    }
    const actualizada = await this.categoriaModel.findByIdAndUpdate(id, updateCategoriaDto, { new: true }).exec();
    if (!actualizada) throw new NotFoundException('Categoría no encontrada');
    return actualizada;
  }

  public async Eliminar(id: string): Promise<Categoria> {
    if (!isValidObjectId(id)) throw new BadRequestException('ID inválido');
    
    const count = await this.productoModel.countDocuments({ categoria: id }).exec();
    if (count > 0) {
      throw new ConflictException('No se puede eliminar la categoría porque tiene productos asociados');
    }

    const eliminada = await this.categoriaModel.findByIdAndDelete(id).exec();
    if (!eliminada) throw new NotFoundException('Categoría no encontrada');
    return eliminada;
  }
}
