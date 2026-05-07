import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI as string), 
    CategoriasModule,
    ProductosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
