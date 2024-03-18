import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, HydratedDocument, ObjectId } from "mongoose";

export type AulaDocument = HydratedDocument<Aula>;

@Schema()
export class Aula{
    
    @Prop({required: true})
    nome:string;

    @Prop({required: true})
    moduloId: string;

    @Prop({required:true})
    data:string;   
    
    @Prop()
    conteudo: string;

}

export const AulaSchema = SchemaFactory.createForClass(Aula);