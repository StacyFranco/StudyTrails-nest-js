import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { AulaService } from './aula.service'; 
import { AulaDto } from './dtos/aulas.dto'; 

@Controller('aula')
export class AulaController {
    constructor(
        private readonly service: AulaService
    ) { }

    @Get('modulo/:id')
    async getAulas(@Param() params) {
        const { id } = params;
        const result = await this.service.getAulasByModuloId(id);

        return result.map(m => ({
            id: m._id.toString(),
            nome: m.nome,
            data: m.data,
        }) as AulaDto)
        
    }
    
    @Get(':id')
    async getAulaById(@Param() params){
        const { id } = params;

        return await this.service.getAulaById(id);
    }

    @Post()
    async create(@Body() dto: AulaDto) {
        await this.service.createAula(dto);
    }

    @Put(':id')
    async UpdateModulo(@Param() params, @Body() dto: AulaDto) {
        const { id } = params;
        await this.service.updateAula(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteModulo(@Param() params) {
        const { id } = params;
        await this.service.deleteAula(id);
    }
}
