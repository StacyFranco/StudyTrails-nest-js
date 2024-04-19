import {MinLength, IsString } from "class-validator";
import { LessonMessagesHelper } from "../helpers/lessonMessages.helper"; 

export class LessonDto {

    id: string;

    @MinLength(2, { message: LessonMessagesHelper.NAME_NOT_VALID })
    name: string;

    @IsString({ message: LessonMessagesHelper.CHAPTER_NOT_VALID })
    chapterId: string;

    @MinLength(8,{ message: LessonMessagesHelper.DATE_NOT_VALID })
    data: string;
  
}