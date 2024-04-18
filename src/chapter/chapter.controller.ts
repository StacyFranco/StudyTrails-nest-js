import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Logger } from '@nestjs/common';
import { ModuloService } from './chapter.service';
import { ModuloDto } from './dtos/chapter.dto';
import { ISPublic } from 'src/auth/decorators/ispublic.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('chapter')
export class ModuloController {
    private logger = new Logger(ModuloController.name);
    constructor(
        private readonly service: ModuloService
    ) { }

    @Get()
    @ISPublic()
    async getModulos() {
        
      const result= await this.service.getModulos();
      this.logger.debug('getModulos:',result);
        return result;
       /* return result.map(m => ({
            id: m._id.toString(),
            nome: m.nome,
            numeroAulas: m.numeroAulas,
        }) as ModuloDto)
        */
    }
    
    @Get(':id')
    @ISPublic()
    async getModuloById(@Param() params){
        const { id } = params;

        return await this.service.getModuloById(id);
    }

    @Post()
    @Roles(Role.Admin)
    async create(@Body() dto: ModuloDto) {
        await this.service.createModulo(dto);
    }

    @Put(':id')
    @Roles(Role.Admin)
    async UpdateModulo(@Param() params, @Body() dto: ModuloDto) {
        const { id } = params;
        await this.service.updateModulo(id, dto);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteModulo(@Param() params) {
        const { id } = params;
        await this.service.deleteModulo(id);
    }
}
