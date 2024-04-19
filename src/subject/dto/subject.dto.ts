import { MinLength } from "class-validator";
import { subjectMessagesHelper } from "../helpers/subjectMessages.helper";




export class SubjectDto {
    @MinLength(2,{message: subjectMessagesHelper.NAME_NOT_VALID})
    name: string;

     //@IsNumber({message: ChapterMessagesHelper.REGISTER_NUMBER_CLASSES_NOT_VALID})
     numberChapters: number;
}
