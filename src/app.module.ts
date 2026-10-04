import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module.js';
import { ProductsModule } from './products/products.module.js';
import { ConfigModule } from '@nestjs/config';
import { ProvidersModule } from './providers/providers.module.js';
import { ManagersModule } from './managers/managers.module.js';
import { LocationsModule } from './locations/locations.module.js';
import { RegionModule } from './region/region.module.js';
import { AuthModule } from './auth/auth.module.js';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.host,
      port: 5432,
      username: "postgres",
      password: process.env.pass,
      database: process.env.name,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    EmployeesModule,
    ProductsModule,
    ProvidersModule,
    ManagersModule,
    LocationsModule,
    RegionModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
