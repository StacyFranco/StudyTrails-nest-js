import { Controller, Get, Post, Body, Put, Param, Delete, Logger } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectDto } from './dto/subject.dto';
import { ISPublic } from 'src/auth/decorators/ispublic.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';


@Controller('subject')
export class SubjectController {
  private logger = new Logger(SubjectController.name);
  constructor(
    private readonly subjectService: SubjectService
  ) {}

 
  @Get()
  @ISPublic()
  async findAll() {
    return await this.subjectService.findAll();
  }

  @Get(':id')
  @ISPublic()
  async findOne(@Param('id') id: string) {
    return await this.subjectService.findOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createSubjectDto: SubjectDto) {
    return await this.subjectService.create(createSubjectDto);
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() updateSubjectDto: SubjectDto) {
    return await this.subjectService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.subjectService.remove(id);
  }
}
