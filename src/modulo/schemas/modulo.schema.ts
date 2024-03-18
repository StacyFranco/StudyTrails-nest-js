import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type ModuloDocument = HydratedDocument<Modulo>;

@Schema()
export class Modulo{
    
    @Prop({required: true})
    nome:string;

    @Prop({default: 0})
    numeroAulas:number;    

}

export const ModuloSchema = SchemaFactory.createForClass(Modulo);