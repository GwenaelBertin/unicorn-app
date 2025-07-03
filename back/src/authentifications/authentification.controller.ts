import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';

// DTO pour valider les entrées du login
export class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthentificationController {
  constructor(private readonly authentificationService: AuthentificationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Valide l'utilisateur (lève une exception si mauvais identifiants)
    const user = await this.authentificationService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    // Génère et retourne le token
    return this.authentificationService.generateAccessToken(user.userId, user.email);
  }
} 