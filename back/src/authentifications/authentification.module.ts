import { Module } from '@nestjs/common'; // module de base de NestJS
import { JwtModule } from '@nestjs/jwt'; // module pour les tokens JWT
import { PassportModule } from '@nestjs/passport'; // Framework d'authentification qui s'intègre avec NestJS.
import { ConfigModule, ConfigService } from '@nestjs/config'; // module pour les variables d'environnement
import { AuthentificationService } from './authentification.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthentificationController } from './authentification.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      // Importe ConfigModule pour accéder aux variables d'environnement
      imports: [ConfigModule],
      // Injecte ConfigService pour les lire 
      inject: [ConfigService],
      // Fonction factory qui retourne la configuration du JwtModule
      useFactory: (configService: ConfigService) => ({
        // La clé secrète utilisée pour signer les tokens JWT rcpr dep .env
        secret: configService.get('JWT_SECRET_KEY'),
        // Options de config pour les tokens générés par défaut
        signOptions: { 
          expiresIn: '60m', 
        },
      }),
    }),
  ],
  controllers: [AuthentificationController],
  // Déclare le service d'auth comme provider
  providers: [AuthentificationService, JwtStrategy],
  // Exporte le service d'auth pour qu'il soit utilisable dans d'autres modules
  exports: [AuthentificationService],
})
export class AuthentificationModule {} 