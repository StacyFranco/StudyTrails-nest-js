import {MinLength, IsString } from "class-validator";
import { AulaMessagesHelper } from "../helpers/aulaMessages.helper"; 

export class AulaUpdateDto {

    @MinLength(2, { message: AulaMessagesHelper.NAME_NOT_VALID })
    nome: string;

    @IsString({ message: AulaMessagesHelper.MODULO_NOT_VALID })
    moduloId: string;

    @MinLength(8,{ message: AulaMessagesHelper.DATE_NOT_VALID })
    data: string;

    @IsString()
    conteudo: string;
  
}