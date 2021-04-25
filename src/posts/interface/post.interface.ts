import { Document } from 'mongoose';

export interface Post extends Document {
  readonly name: string;
  readonly price: number;
  readonly sale: number;
}
