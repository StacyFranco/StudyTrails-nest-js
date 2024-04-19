import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SubjectDocument = HydratedDocument<Subject>;

@Schema()
export class Subject{
    
    @Prop({required: true})
    name:string;

    @Prop({default: 0})
    numberChapters:number;    

}

export const SubjectSchema = SchemaFactory.createForClass(Subject);