import {MinLength, IsString } from "class-validator";
import { AulaMessagesHelper } from "../helpers/lessonMessages.helper"; 

export class AulaDto {

    id: string;

    @MinLength(2, { message: AulaMessagesHelper.NAME_NOT_VALID })
    nome: string;

    @IsString({ message: AulaMessagesHelper.MODULO_NOT_VALID })
    chapterId: string;

    @MinLength(8,{ message: AulaMessagesHelper.DATE_NOT_VALID })
    data: string;
  
}