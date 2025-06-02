/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtTokenService } from './art_token/art_token.service';
import { ArtTokenModule } from './art_token/art_token.module';

@Module({
  imports: [ArtTokenModule],
  controllers: [AppController],
  providers: [AppService, ArtTokenService],
})
export class AppModule { }
