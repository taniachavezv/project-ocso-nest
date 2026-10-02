import { Module } from '@nestjs/common';
import { RegionService } from './region.service.js';
import { RegionController } from './region.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities/region.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
