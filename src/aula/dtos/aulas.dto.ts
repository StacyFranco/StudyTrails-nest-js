import {MinLength, IsString } from "class-validator";
import { AulaMessagesHelper } from "../helpers/aulaMessages.helper"; 

export class AulaDto {

    id: string;

    @MinLength(2, { message: AulaMessagesHelper.NAME_NOT_VALID })
    nome: string;

    @IsString()
    moduloId: string;

    @MinLength(8,{ message: AulaMessagesHelper.DATE_NOT_VALID })
    data: string;

    
    conteudo: string;
}