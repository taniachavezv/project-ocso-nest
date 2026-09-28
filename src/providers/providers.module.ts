import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersService } from './providers.service.js';
import { ProvidersController } from './providers.controller.js';
import { Provider } from './entities/provider.entity.js';

@Module({
  imports:[TypeOrmModule.forFeature([Provider])],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}
