import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Aula, AulaDocument } from './schemas/aula.schema';
import { AulaDto } from './dtos/aulas.dto'; 
import { AulaMessagesHelper } from './helpers/aulaMessages.helper'; 

@Injectable()
export class AulaService {
    private logger = new Logger(AulaService.name);

    constructor(
        @InjectModel(Aula.name) private readonly model: Model<AulaDocument>,
    ) { }
    
    async getAulasByModuloId(moduloId: string) {
        return this.model.find({ moduloId: moduloId });
    }

    async getAulaById(aulaId: string) {
        return await this.model.findOne({ _id: aulaId });
    }

    async createAula(dto: AulaDto) {
        this.logger.debug('createAula');
        const moduloExist = await this.model.findOne({moduloId: dto.moduloId})
        if(!moduloExist){
            throw new BadRequestException(AulaMessagesHelper.MODULO_NOT_FOUND)
        }
        const createAula = new this.model(dto);
        return await createAula.save();

    }

    async updateAula(aulaId: string, dto: AulaDto) {
        this.logger.debug(`updateAula - ${aulaId}`)
        this.logger.debug(`dto - ${dto.conteudo}`)
        const aula = await this.model.findOne({ _id: aulaId });

        if (!aula) {
            throw new BadRequestException(AulaMessagesHelper.UPDATE_AULA_NOT_FOUND)
        }
        aula.nome = dto.nome;
        aula.moduloId = dto.moduloId;
        aula.data = dto.data;
        aula.conteudo = dto.conteudo;
        await this.model.findByIdAndUpdate({ _id: aulaId }, dto);

    }
    
    async deleteAula( aulaId: string) {
        this.logger.debug(`deleteAula - ${aulaId}`)
        return await this.model.deleteOne({  _id: aulaId });
    }

}
