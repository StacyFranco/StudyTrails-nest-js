import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import {  HydratedDocument } from "mongoose";

export type LessonDocument = HydratedDocument<Lesson>;

@Schema()
export class Lesson{
    
    @Prop({required: true})
    name:string;

    @Prop({required: true})
    chapterId: string;

    @Prop({required:true})
    data:string;   
    
    @Prop({default:""})
    content: string;

}

export const LessonSchema = SchemaFactory.createForClass(Lesson);