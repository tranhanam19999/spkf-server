import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MediaDocument=Media & Document;

@Schema()
export class Media{
    @Prop()
    name: string

    @Prop()
    createdDate: string

    @Prop()
    type: string

    @Prop()
    postId: string

    @Prop()
    url: string
}

export const MediaSchema= SchemaFactory.createForClass(Media)