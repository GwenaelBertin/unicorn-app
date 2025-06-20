// Module Prisma : rend Prisma disponible dans toute l'app
// Le décorateur @Global() permet d'injecter PrismaService partout sans avoir à l'importer 
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService], 
  exports: [PrismaService],   
})
export class PrismaModule {} 