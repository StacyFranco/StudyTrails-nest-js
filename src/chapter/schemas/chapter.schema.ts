import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ChapterDocument = HydratedDocument<Chapter>;

@Schema()
export class Chapter{
    
    @Prop({required: true})
    name:string;

    @Prop({default: 0})
    numberLessons:number;    

}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);