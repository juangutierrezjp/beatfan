import { Module } from '@nestjs/common';
import { ArtTokenController } from './art_token.controller';
import { ArtTokenService } from './art_token.service';

@Module({
  controllers: [ArtTokenController],
  providers: [ArtTokenService],
})
export class ArtTokenModule { }
