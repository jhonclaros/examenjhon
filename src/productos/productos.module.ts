import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';

import { Producto, ProductoSchema } from './schemas/producto.schema';
import { Categoria, CategoriaSchema } from '../categorias/schemas/categoria.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Producto.name, schema: ProductoSchema },
      { name: Categoria.name, schema: CategoriaSchema },
    ]),
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
