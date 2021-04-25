import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  sale: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
