import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { ModuloController } from './modulo.controller';
import { ModuloService } from './modulo.service';
import { Modulo,ModuloSchema } from './schemas/modulo.schema';

@Module({
  imports: [ MongooseModule.forFeature([
    {name: Modulo.name, schema: ModuloSchema},
  ])],
  controllers: [ModuloController],
  providers: [ModuloService],
  exports: [MongooseModule, ModuloService]
})
export class ModuloModule {}
