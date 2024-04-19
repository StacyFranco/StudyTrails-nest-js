import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Chapter, ChapterDocument } from './schemas/chapter.schema';
import { ChapterDto } from './dtos/chapter.dto';
import { ChapterMessagesHelper } from './helpers/chapterMessages.helper';

@Injectable()
export class ChapterService {
    private logger = new Logger(ChapterService.name);

    constructor(
        @InjectModel(Chapter.name) private readonly model: Model<ChapterDocument>,
    ) { }
    
    async getChapters() {
        this.logger.debug('getChapters');
        return await this.model.find().exec();
    }

    async getChapterById(chapterId: string) {
        return await this.model.findOne({ _id: chapterId });
    }

    async createChapter(dto: ChapterDto) {
        this.logger.debug('createChapter');


        const createChapter = new this.model(dto);
        return await createChapter.save();

    }

    async updateChapter(chapterId: string, dto: ChapterDto) {
        this.logger.debug(`updateChapter - ${chapterId}`)
        const chapter = await this.model.findOne({ _id: chapterId });

        if (!chapter) {
            throw new BadRequestException(ChapterMessagesHelper.UPDATE_CHAPTER_NOT_FOUND)
        }
        chapter.name = dto.name;
        await this.model.findByIdAndUpdate({ _id: chapterId }, chapter);

    }
    
    async deleteChapter( chapterId: string) {
        this.logger.debug(`deleteChapter - ${chapterId}`)
        return await this.model.deleteOne({  _id: chapterId });
    }

}
