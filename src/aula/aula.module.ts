import { Module } from '@nestjs/common';
import { AulaService } from './aula.service';
import { AulaController } from './aula.controller';

@Module({
  providers: [AulaService],
  controllers: [AulaController]
})
export class AulaModule {}
