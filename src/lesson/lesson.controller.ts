import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { LessonService } from './lesson.service'; 
import { LessonDto } from './dtos/lessons.dto'; 
import { LessonUpdateDto } from './dtos/lessonUpdate.dto';
import { ISPublic } from 'src/auth/decorators/ispublic.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('lesson')
export class LessonController {
    constructor(
        private readonly service: LessonService
    ) { }

    @Get('chapter/:id')
    @ISPublic()
    async getLessons(@Param() params) {
        const { id } = params;
        const result = await this.service.getLessonsByChapterId(id);

        return result.map(m => ({
            id: m._id.toString(),
            name: m.name,
            data: m.data,
        }) as LessonDto)
        
    }
    
    @Get(':id')
    @ISPublic()
    async getLessonById(@Param() params){
        const { id } = params;

        return await this.service.getLessonById(id);
    }

    @Post()
    @Roles(Role.Admin)
    async create(@Body() dto: LessonDto) {
        await this.service.createLesson(dto);
    }

    @Put(':id')
    @Roles(Role.Admin)
    async UpdateChapter(@Param() params, @Body() dto: LessonUpdateDto) {
        const { id } = params;
        await this.service.updateLesson(id, dto);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteChapter(@Param() params) {
        const { id } = params;
        await this.service.deleteLesson(id);
    }
}
