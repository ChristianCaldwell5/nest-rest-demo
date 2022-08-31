import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type AnimalDocument = Animal & Document;

@Schema()
export class Animal {
    
    @Prop({ required: true })
    type: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    age: number

}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
