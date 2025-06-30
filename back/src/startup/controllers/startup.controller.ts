import { Controller, Get, Param, Delete, Post, Patch, Body } from '@nestjs/common';
import { StartupService } from '../services/controllers/startup.controller.service';
import { Prisma } from '@prisma/client';
import StartupDto from '../models/dto/startup.dto';

@Controller('startups')
export class StartupController {
  constructor(private readonly startupService: StartupService) {}

  @Post()
  createStartup(@Body() body: StartupDto) {
    return this.startupService.create(body.startup);
  }

  @Get()
  getAllStartups() {
    return this.startupService.findAll();
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