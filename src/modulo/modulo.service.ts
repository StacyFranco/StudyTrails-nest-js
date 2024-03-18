import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Modulo, ModuloDocument } from './schemas/modulo.schema';
import { ModuloDto } from './dtos/modulo.dto';
import { ModuloMessagesHelper } from './helpers/moduloMessages.helper';

@Injectable()
export class ModuloService {
    private logger = new Logger(ModuloService.name);

    constructor(
        @InjectModel(Modulo.name) private readonly model: Model<ModuloDocument>,
    ) { }
    
    async getModulos() {
        return this.model.find().exec();
    }

    async getModuloById(moduloId: string) {
        return await this.model.findOne({ _id: moduloId });
    }

    async createModulo(dto: ModuloDto) {
        this.logger.debug('createModulo');


        const createModulo = new this.model(dto);
        return await createModulo.save();

    }

    async updateModulo(moduloId: string, dto: ModuloDto) {
        this.logger.debug(`updateModulo - ${moduloId}`)
        const modulo = await this.model.findOne({ _id: moduloId });

        if (!modulo) {
            throw new BadRequestException(ModuloMessagesHelper.UPDATE_MODULO_NOT_FOUND)
        }
        modulo.nome = dto.nome;
        await this.model.findByIdAndUpdate({ _id: moduloId }, modulo);

    }
    
    async deleteModulo( moduloId: string) {
        this.logger.debug(`deleteModulo - ${moduloId}`)
        return await this.model.deleteOne({  _id: moduloId });
    }

}
