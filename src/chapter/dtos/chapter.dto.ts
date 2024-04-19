import {MinLength,IsNumber } from "class-validator";
import { ChapterMessagesHelper } from "../helpers/chapterMessages.helper";



export class ChapterDto {
    @MinLength(2,{message: ChapterMessagesHelper.NAME_NOT_VALID})
    name: string;

    //@IsNumber({message: ChapterMessagesHelper.REGISTER_NUMBER_CLASSES_NOT_VALID})
    numberLessons: number;
    
}


    
    