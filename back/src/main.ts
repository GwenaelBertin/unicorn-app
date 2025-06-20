// Point d'entrée de l'app, démarre le serveur.
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaModule } from './prisma/prisma.module';

async function bootstrap() {
  // Creation de l'app NestJS à partir du module principal
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // on autorise les requetes dep le front
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
