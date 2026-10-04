import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionService } from './region.service.js';
import { CreateRegionDto } from './dto/create-region.dto.js';
import { UpdateRegionDto } from './dto/update-region.dto.js';
import { Auth } from '../auth/decorators/auth.decorator.js';
import { ROLES } from '../auth/constants/roles.constants.js';
import { ApiAuth } from '../auth/decorators/api.decorator.js';
import { ApiTags } from '@nestjs/swagger';

@ApiAuth()
@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Auth()
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
