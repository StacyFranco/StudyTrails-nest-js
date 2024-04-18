import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Aula, AulaDocument } from './schemas/lesson.schema';
import { AulaDto } from './dtos/lessons.dto';
import { AulaUpdateDto } from './dtos/lessonUpdate.dto';
import { AulaMessagesHelper } from './helpers/lessonMessages.helper'; 

@Injectable()
export class AulaService {
    private logger = new Logger(AulaService.name);

    constructor(
        @InjectModel(Aula.name) private readonly model: Model<AulaDocument>,
    ) { }
    
    async getAulasByModuloId(chapterId: string) {
        return this.model.find({ chapterId: chapterId });
    }

    async getAulaById(lessonId: string) {
        return await this.model.findOne({ _id: lessonId });
    }

    async createAula(dto: AulaDto) {
        this.logger.debug('createAula');
        const chapterExist = await this.model.findOne({chapterId: dto.chapterId})
        if(!chapterExist){
            throw new BadRequestException(AulaMessagesHelper.MODULO_NOT_FOUND)
        }
        const createAula = new this.model(dto);
        return await createAula.save();

    }

    async updateAula(lessonId: string, dto: AulaUpdateDto) {
        this.logger.debug(`updateAula - ${lessonId}`)
        this.logger.debug(`dto - ${dto.conteudo}`)
        const lesson = await this.model.findOne({ _id: lessonId });

        if (!lesson) {
            throw new BadRequestException(AulaMessagesHelper.UPDATE_AULA_NOT_FOUND)
        }
        lesson.nome = dto.nome;
        lesson.chapterId = dto.chapterrId;
        lesson.data = dto.data;
        lesson.conteudo = dto.conteudo;
        await this.model.findByIdAndUpdate({ _id: lessonId }, lesson);

    }
    
    async deleteAula( lessonId: string) {
        this.logger.debug(`deleteAula - ${lessonId}`)
        return await this.model.deleteOne({  _id: lessonId });
    }

}
