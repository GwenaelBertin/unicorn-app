import { Controller, Get, Param, Delete, Post, Patch, Body } from '@nestjs/common';
import { StartupService } from './startup.service';
import { Prisma } from '@prisma/client';

@Controller('startups')
export class StartupController {
  constructor(private readonly startupService: StartupService) {}

  @Post()
  createStartup(@Body() body: any) {
    return this.startupService.create(body);
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
    @Body() body: any,
  ) {
    return this.startupService.update(Number(id), body);
  }

  @Delete(':id')
  deleteStartup(@Param('id') id: string) {
    return this.startupService.remove(Number(id));
  }
} 