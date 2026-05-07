import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Categoria, CategoriaSchema } from './schemas/categoria.schema';
import { Producto, ProductoSchema } from '../productos/schemas/producto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categoria.name, schema: CategoriaSchema },
      { name: Producto.name, schema: ProductoSchema },
    ])
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports: [CategoriasService, MongooseModule] 
})
export class CategoriasModule {}