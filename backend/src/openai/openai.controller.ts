import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OrthographyRequestDto } from './dtos';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() orthographyBody: OrthographyRequestDto) {
    return this.openaiService.orthographyCheck(orthographyBody);
  }
}
