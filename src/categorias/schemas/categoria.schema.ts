import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) 
export class Categoria extends Document {
  @Prop({ required: true, unique: true })
  Nombre: string;

  @Prop({ maxlength: 200 })
  Descripcion?: string;

  @Prop({ type: Number, required: true })
  IdCategoria: number;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
