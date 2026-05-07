import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Producto extends Document {
  @Prop({ required: true, unique: true })
  Nombre: string;

  @Prop({ required: true, min: 0 })
  Precio: number;

  @Prop({ required: true, min: 0 })
  Stock: number;

  @Prop({ type: Types.ObjectId, ref: 'Categoria', required: true })
  categoria: Types.ObjectId;

  @Prop({ default: true })
  activo: boolean;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
