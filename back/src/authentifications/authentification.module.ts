import { Module } from '@nestjs/common'; // module de base de NestJS
import { JwtModule } from '@nestjs/jwt'; // module pour les tokens JWT
import { PassportModule } from '@nestjs/passport'; // Framework d'authentification qui s'intègre avec NestJS.
import { ConfigModule, ConfigService } from '@nestjs/config'; // module pour les variables d'environnement

/**
 * AuthentificationModule est un module qui configure les fonctionnalités d'authentification JWT pour l'application.
 */
 
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      // Importe le ConfigModule pour accéder aux variables d'environnement
      imports: [ConfigModule],
      // Injecte le ConfigService pour lire les variables d'environnement
      inject: [ConfigService],
      // Fonction factory qui retourne la configuration du JwtModule
      useFactory: (configService: ConfigService) => ({
        // La clé secrète utilisée pour signer les tokens JWT rcpr dep .env
        secret: configService.get('JWT_SECRET_KEY'),
        // Options de config pour les tokens générés par défaut
        signOptions: { 
          expiresIn: '15m', 
        },
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class AuthentificationModule {} 