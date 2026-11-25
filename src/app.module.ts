import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './user/user.module.js';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/config/env.validation.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity.js';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env'],
    validate
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'bcs-journey',
    entities: [User],
    synchronize: true
  }),
  UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
