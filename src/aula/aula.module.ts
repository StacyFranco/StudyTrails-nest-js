import { Module } from '@nestjs/common';
import { AulaService } from './aula.service';
import { AulaController } from './aula.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Aula, AulaSchema } from './schemas/aula.schema';

@Module({
  imports: [ MongooseModule.forFeature([
    {name: Aula.name, schema: AulaSchema},
  ])],
  providers: [AulaService],
  controllers: [AulaController],
  exports: [MongooseModule, AulaService]
})
export class AulaModule {}
