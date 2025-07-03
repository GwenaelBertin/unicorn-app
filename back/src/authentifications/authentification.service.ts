/**
 * Ce service gère les fonctionnalités principales liées à l'auth:
 * - Validation des users
 * - Génération des tokens JWT (access & refresh token)
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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
    const user = await this.prisma.user.findFirst({ where: { email } });

    // On vérifie si le user existe et si le mdp correspond
    if (user && (await bcrypt.compare(password, user.password))) {
      // Bien entendu, on retire le mdp des infos du return !!
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Génère un access token pour un utilisateur
   * 
   * @param userId 
   * @param email
   * @returns Un objet contenant l'access token
   */
  async generateAccessToken(userId: number, email: string) {
    // Création du payload JWT qui sera inclus dans le token
    const payload = { sub: userId, email };
    
    // Création access token
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
} 