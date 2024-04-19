import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SubjectDto } from './dto/subject.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject, SubjectDocument } from './schemas/subject.schema';
import { subjectMessagesHelper } from './helpers/subjectMessages.helper';

@Injectable()
export class SubjectService {
  private logger = new Logger(SubjectService.name)

  constructor(
    @InjectModel(Subject.name) private readonly model: Model<SubjectDocument>,
) { }

async findAll() {
  this.logger.debug('getChapters');
        return this.model.find().exec();
}

async findOne(subjectId: string) {
  return await this.model.findOne({ _id: subjectId });
}

 async create(SubjectDto: SubjectDto) {
  this.logger.debug('createSubject');


  const createSubject = new this.model(SubjectDto);
  return await createSubject.save();
  }

  async update(subjectId: string, SubjectDto: SubjectDto) {
    this.logger.debug(`updateSubject - ${subjectId}`)
        const subject = await this.model.findOne({ _id: subjectId });

        if (!subject) {
            throw new BadRequestException(subjectMessagesHelper.UPDATE_SUBJECT_NOT_FOUND)
        }
        subject.name = SubjectDto.name;
        await this.model.findByIdAndUpdate({ _id: subjectId }, subject);

  }

  async remove(subjectId: string) {
    this.logger.debug(`deleteSubject - ${subjectId}`)
        return await this.model.deleteOne({  _id: subjectId });
  }
}
