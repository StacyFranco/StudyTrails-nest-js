import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { ModuloController } from './chapter.controller';
import { ModuloService } from './chapter.service';
import { Modulo,ModuloSchema } from './schemas/chapter.schema';

@Module({
  imports: [ MongooseModule.forFeature([
    {name: Modulo.name, schema: ModuloSchema},
  ])],
  controllers: [ModuloController],
  providers: [ModuloService],
  exports: [MongooseModule, ModuloService]
})
export class ModuloModule {}
