// Point d'entrée de l'app, démarre le serveur.
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  // Creation de l'app NestJS à partir du module principal
  const app = await NestFactory.create(AppModule);
  
  // Ajout du middleware cookie-parser pour lire les cookies
  app.use(cookieParser());
  
  // Activation de CORS avec support des cookies
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });
  
  app.setGlobalPrefix('api'); // permet d'ajouter un préfixe à toutes les routes
  const port = process.env.PORT ?? 5002;
  await app.listen(port, '0.0.0.0');
  console.log(`NestJS ecoute sur le port http://localhost:${port}`);
}

bootstrap();
