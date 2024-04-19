import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Logger } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterDto } from './dtos/chapter.dto';
import { ISPublic } from 'src/auth/decorators/ispublic.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('chapter')
export class ChapterController {
    private logger = new Logger(ChapterController.name);
    constructor(
        private readonly service: ChapterService
    ) { }

    @Get()
    @ISPublic()
    async getChapters() {
        
      const result= await this.service.getChapters();
      this.logger.debug('getChapters:',result);
        return result;
       /* return result.map(m => ({
            id: m._id.toString(),
            name: m.name,
            numeroLessons: m.numeroLessons,
        }) as ChapterDto)
        */
    }
    
    @Get(':id')
    @ISPublic()
    async getChapterById(@Param() params){
        const { id } = params;

        return await this.service.getChapterById(id);
    }

    @Post()
    @Roles(Role.Admin)
    async create(@Body() dto: ChapterDto) {
        await this.service.createChapter(dto);
    }

    @Put(':id')
    @Roles(Role.Admin)
    async UpdateChapter(@Param() params, @Body() dto: ChapterDto) {
        const { id } = params;
        await this.service.updateChapter(id, dto);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteChapter(@Param() params) {
        const { id } = params;
        await this.service.deleteChapter(id);
    }
}
