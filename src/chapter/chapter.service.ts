import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Modulo, ModuloDocument } from './schemas/chapter.schema';
import { ModuloDto } from './dtos/chapter.dto';
import { ModuloMessagesHelper } from './helpers/chapterMessages.helper';

@Injectable()
export class ModuloService {
    private logger = new Logger(ModuloService.name);

    constructor(
        @InjectModel(Modulo.name) private readonly model: Model<ModuloDocument>,
    ) { }
    
    async getModulos() {
        this.logger.debug('getModulos');
        return this.model.find().exec();
    }

    async getModuloById(chapterId: string) {
        return await this.model.findOne({ _id: chapterId });
    }

    async createModulo(dto: ModuloDto) {
        this.logger.debug('createModulo');


        const createModulo = new this.model(dto);
        return await createModulo.save();

    }

    async updateModulo(chapterId: string, dto: ModuloDto) {
        this.logger.debug(`updateModulo - ${chapterId}`)
        const chapter = await this.model.findOne({ _id: chapterId });

        if (!chapter) {
            throw new BadRequestException(ModuloMessagesHelper.UPDATE_MODULO_NOT_FOUND)
        }
        chapter.nome = dto.nome;
        await this.model.findByIdAndUpdate({ _id: chapterId }, chapter);

    }
    
    async deleteModulo( chapterId: string) {
        this.logger.debug(`deleteModulo - ${chapterId}`)
        return await this.model.deleteOne({  _id: chapterId });
    }

}
