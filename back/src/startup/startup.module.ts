import { Module } from '@nestjs/common';
import { StartupController } from './controllers/startup.controller';
import { StartupService } from './services/controllers/startup.controller.service';

@Module({
  controllers: [StartupController],
  providers: [StartupService],
})
export class StartupModule {} 