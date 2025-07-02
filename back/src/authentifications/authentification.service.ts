/**
 * Ce service gère les fonctionnalités principales liées à l'auth:
 * - Validation des users
 * - Génération des tokens JWT (access & refresh token)
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthentificationService {
  constructor(
    /**
     * JwtService : Service fourni par @nestjs/jwt pour manipuler les JWT
     * Permet de signer et vérifier les tokens
     */
    private readonly jwtService: JwtService,

    /**
     * PrismaService : Service d'accès à la bdd
     * Permet d'interagir avec les modèles définis dans le schéma Prisma
     */
    private readonly prisma: PrismaService,

    /**
     * ConfigService : Service d'accès aux variables d'env
     * Permet de récupérer les clés secrètes et autres config
     */
    private readonly configService: ConfigService,
  ) {}

  /**
   * Valide les identifiants d'un utilisateur
   * 
   * @param email
   * @param password
   * @returns L'utilisateur sans mdp si validé, null sinon
   */
  async validateUser(email: string, password: string) {
    // On recherche l'utilisateur par email avec son profil
    const user = await this.prisma.user.findFirst({
      where: { email },
      include: { profile: true },
    });

    // On vérifie si le user existe et si le mdp correspond
    if (user && (await bcrypt.compare(password, user.password))) {
      // Bien entendu, on retire le mdp des infos du return !!
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Génère un access token et un refresh token pour un utilisateur
   * 
   * @param userId 
   * @param email
   * @returns Un objet contenant l'access token et le refresh token
   */
  async generateTokens(userId: number, email: string) {
    // Création du payload JWT qui sera inclus dans les tokens
    const payload = { sub: userId, email };
    
    // Création access token
    const accessToken = this.jwtService.sign(payload);
    
    // Création refresh token avec une durée plus longue
    const refreshToken = this.jwtService.sign(
      payload,
      {
        // Utilise une clé secrète différente pour le refresh token
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d', 
      },
    );

    // Sauvegarde du refresh token en bdd pour validation ultérieure
    await this.prisma.refreshToken.create({
      data: {
        value: refreshToken,
        userId,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Rafraîchit les tokens JWT à partir d'un refresh token valide
   * 
   * @param refreshToken - Le refresh token à vérifier
   * @returns De nouveaux tokens (access token et refresh token)
   */
  async refreshTokens(refreshToken: string) {
    try {
      // Vérifier la validité du refresh token (signature et expiration)
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      // Vérifier que le token existe en bdd
      const storedToken = await this.prisma.refreshToken.findFirst({
        where: { value: refreshToken, userId: payload.sub },
      });

      // Si le token n'est pas trouvé en bdd, il n'est pas valide
      if (!storedToken) {
        throw new Error('Invalid refresh token');
      }

      // Générer de nouveaux tokens
      return this.generateTokens(payload.sub, payload.email);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  /**
   * Supprime un refresh token de la base de données (lors de la déconnexion)
   * 
   * @param refreshToken - Le refresh token à supprimer
   */
  async removeRefreshToken(refreshToken: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { value: refreshToken },
    });
  }

  /**
   * Retourne les options de configuration pour les cookies sécurisés
   * 
   * @param isSecure - Indique si le cookie doit être envoyé uniquement sur HTTPS
   * @returns Options de config des cookies
   */
  getCookieOptions(isSecure: boolean = true) {
    return {
      httpOnly: true, // Le cookie n'est pas accessible via JavaScript
      secure: isSecure, // Le cookie est envoyé uniquement sur HTTPS si true
      sameSite: 'strict' as const, // Le cookie est envoyé uniquement sur le même site
      path: '/', // Le cookie est disponible sur tout le site
    };
  }
} 