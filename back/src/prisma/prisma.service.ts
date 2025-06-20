// Service qui encapsule l'accès à la bdd via Prisma
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Connexion à la bdd lors de l'initialisation du module
  async onModuleInit() {
    await this.$connect();
  }
  // Déco de la bdd lors de la destruction 
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
