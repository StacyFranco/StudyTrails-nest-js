import { Injectable } from '@nestjs/common';

@Injectable()
export class AulaService {
    //private logger = new Logger(AulaService.name);

   /* constructor(
        @InjectModel(Aula.name) private readonly model: Model<AulaDocument>,
        private readonly moduloService: ModuloService
    ) { }

    async getAulas(moduloId: string) {
        this.logger.debug(`GetModuloAulas - ${moduloId}`)
        const modulo = await this.model.findOne({ _id: moduloId });

        return await this.aulasModel.find({ modulo });
    }*/
}
