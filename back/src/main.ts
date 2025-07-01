// Point d'entrée de l'app, démarre le serveur.
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Creation de l'app NestJS à partir du module principal
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix('api'); // permet d'ajouter un préfixe à toutes les routes
  await app.listen(process.env.PORT ?? 5002);
}
bootstrap();
