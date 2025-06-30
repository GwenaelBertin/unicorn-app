import { Controller, Get, Param, Delete, Post, Patch, Body } from '@nestjs/common';
import StatusDto from '../models/dto/status.dto';
import { StatusService } from '../services/controllers/status.controller.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  createStatus(@Body() body: StatusDto) {
    return this.statusService.create(body.status);
  }

  @Get()
  getAllStatus() {
    return this.statusService.findAll();
  }

  @Get(':id')
  getOneStatus(@Param('id') id: string) {
    return this.statusService.findOne(Number(id));
  }

  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() body: StatusDto,
  ) {
    return this.statusService.update(Number(id), body.status);
  }

  @Delete(':id')
  deleteStatus(@Param('id') id: string) {
    return this.statusService.remove(Number(id));
  }
} 