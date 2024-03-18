import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { ModuloDto } from './dtos/Modulo.dto';

@Controller('modulo')
export class ModuloController {
    constructor(
        private readonly service: ModuloService
    ) { }

    @Get()
    async getModulos() {
        
       return await this.service.getModulos();

       /* return result.map(m => ({
            id: m._id.toString(),
            nome: m.nome,
            numeroAulas: m.numeroAulas,
        }) as ModuloDto)
        */
    }
    
    @Get(':id')
    async getModuloById(@Param() params){
        const { id } = params;

        return await this.service.getModuloById(id);
    }

    @Post()
    async create(@Body() dto: ModuloDto) {
        await this.service.createModulo(dto);
    }

    @Put(':id')
    async UpdateModulo(@Param() params, @Body() dto: ModuloDto) {
        const { id } = params;
        await this.service.updateModulo(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteModulo(@Param() params) {
        const { id } = params;
        await this.service.deleteModulo(id);
    }
}
