import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './user/user.module.js';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/config/env.validation.js';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env'],
    validate
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
