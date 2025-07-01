import { Controller, Get, Param, Delete, Post, Patch, Body } from '@nestjs/common';
import { StartupService } from '../services/controllers/startup.controller.service';
import { Prisma } from '@prisma/client';
import StartupDto from '../models/dto/startup.dto';

@Controller('startups')
export class StartupController {
  constructor(private readonly startupService: StartupService) {
    console.log('StartupController loaded');
  }

  @Post()
  createStartup(@Body() body: StartupDto) {
    return this.startupService.create(body.startup);
  }

  @Get()
async getAllStartups() {
  console.log('GET /api/startups called');
  try {
    const result = await this.startupService.findAll();
    console.log('Résultat startups:', result);
    return result;
  } catch (error) {
    console.error('Erreur dans le controller:', error);
    throw error;
  }
}
    

  @Get(':id')
  getOneStartup(@Param('id') id: string) {
    return this.startupService.findOne(Number(id));
  }

  @Patch(':id')
  updateStartup(
    @Param('id') id: string,
    @Body() body: StartupDto,
  ) {
    return this.startupService.update(Number(id), body.startup);
  }

  @Delete(':id')
  deleteStartup(@Param('id') id: string) {
    return this.startupService.remove(Number(id));
  }
} 