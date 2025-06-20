import { Module } from '@nestjs/common';
import { SectorController } from './sector.controller';

@Module({
  controllers: [SectorController],
})
export class SectorModule {} 