import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson, LessonDocument } from './schemas/lesson.schema';
import { LessonDto } from './dtos/lessons.dto';
import { LessonUpdateDto } from './dtos/lessonUpdate.dto';
import { LessonMessagesHelper } from './helpers/lessonMessages.helper'; 

@Injectable()
export class LessonService {
    private logger = new Logger(LessonService.name);

    constructor(
        @InjectModel(Lesson.name) private readonly model: Model<LessonDocument>,
    ) { }
    
    async getLessonsByChapterId(chapterId: string) {
        return this.model.find({ chapterId: chapterId });
    }

    async getLessonById(lessonId: string) {
        return await this.model.findOne({ _id: lessonId });
    }

    async createLesson(dto: LessonDto) {
        this.logger.debug('createLesson');
        const chapterExist = await this.model.findOne({chapterId: dto.chapterId})
        if(!chapterExist){
            throw new BadRequestException(LessonMessagesHelper.CHAPTER_NOT_FOUND)
        }
        const createLesson = new this.model(dto);
        return await createLesson.save();

    }

    async updateLesson(lessonId: string, dto: LessonUpdateDto) {
        this.logger.debug(`updateLesson - ${lessonId}`)
        this.logger.debug(`dto - ${dto.content}`)
        const lesson = await this.model.findOne({ _id: lessonId });

        if (!lesson) {
            throw new BadRequestException(LessonMessagesHelper.UPDATE_LESSON_NOT_FOUND)
        }
        lesson.name = dto.name;
        lesson.chapterId = dto.chapterId;
        lesson.data = dto.data;
        lesson.content = dto.content;
        await this.model.findByIdAndUpdate({ _id: lessonId }, lesson);

    }
    
    async deleteLesson( lessonId: string) {
        this.logger.debug(`deleteLesson - ${lessonId}`)
        return await this.model.deleteOne({  _id: lessonId });
    }

}
