import { Module } from '@nestjs/common';
import { StartupController } from './startup.controller';

@Module({
  controllers: [StartupController],
})
export class StartupModule {} 