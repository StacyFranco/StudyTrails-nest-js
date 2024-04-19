import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from './schemas/lesson.schema';

@Module({
  imports: [ MongooseModule.forFeature([
    {name: Lesson.name, schema: LessonSchema},
  ])],
  providers: [LessonService],
  controllers: [LessonController],
  exports: [MongooseModule, LessonService]
})
export class LessonModule {}
