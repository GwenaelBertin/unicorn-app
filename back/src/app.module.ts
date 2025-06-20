// Module racine de l'application NestJS. Organise les modules, contrôleurs et services principaux.
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StartupModule } from './startup/startup.module';
import { SectorModule } from './sector/sector.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [PrismaModule, StartupModule, SectorModule, StatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
