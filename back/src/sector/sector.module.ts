import { Module } from '@nestjs/common';
import { SectorController } from './controllers/sector.controller';
import { SectorService } from './services/controllers/sector.controller.service';

@Module({
  controllers: [SectorController],
  providers: [SectorService],
})
export class SectorModule {} 