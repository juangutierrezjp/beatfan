import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ArtTokenService } from './art_token.service';

@Controller('art_token')
export class ArtTokenController {
  constructor(private readonly artTokenService: ArtTokenService) { }

  @Post('/deploy')
  async deploy(
    @Body() body: { artistWallet: string; platformWallet: string; name: string; symbol: string },
  ) {
    return this.artTokenService.deployArtTokenContract(
      body.artistWallet,
      body.platformWallet,
      body.name,
      body.symbol,
    );
  }

  @Get()
  findAll() {
    return this.artTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artTokenService.findOne(id);
  }
}
