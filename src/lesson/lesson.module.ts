import { Module } from '@nestjs/common';
import { AulaService } from './lesson.service';
import { AulaController } from './lesson.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Aula, AulaSchema } from './schemas/lesson.schema';

@Module({
  imports: [ MongooseModule.forFeature([
    {name: Aula.name, schema: AulaSchema},
  ])],
  providers: [AulaService],
  controllers: [AulaController],
  exports: [MongooseModule, AulaService]
})
export class AulaModule {}
