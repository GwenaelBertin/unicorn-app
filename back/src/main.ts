// Point d'entrée de l'app, démarre le serveur.
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Creation de l'app NestJS à partir du module principal
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  // Middleware global pour logger toutes les requêtes
  app.use((req, res, next) => {
    console.log('Request:', req.method, req.url);
    next();
  });
  app.setGlobalPrefix('api'); // permet d'ajouter un préfixe à toutes les routes
  const port = process.env.PORT ?? 5002;
  await app.listen(port, '0.0.0.0');
  console.log(`NestJS ecoute sur le port http://localhost:${port}`);
}
bootstrap();
