import {MinLength,IsNumber } from "class-validator";
import { ModuloMessagesHelper } from "../helpers/chapterMessages.helper";



export class ModuloDto {
    @MinLength(2,{message: ModuloMessagesHelper.NAME_NOT_VALID})
    nome: string;

    //@IsNumber({message: ModuloMessagesHelper.REGISTER_NUMBER_CLASSES_NOT_VALID})
    numeroAulas: number;
    
}


    
    