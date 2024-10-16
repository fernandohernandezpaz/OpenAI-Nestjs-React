import { Response } from 'express';
import {Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OrthographyRequestDto, ProsConsArgumentativeRequestDto, OpenaiOrthographyResponseDto } from './dtos';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() orthographyBody: OrthographyRequestDto): Promise<OpenaiOrthographyResponseDto> {
    return this.openaiService.orthographyCheck(orthographyBody);
  }

  @Post('pros-cons-argumentative')
  prosConsArgumentative(@Body() prosConsArgumentativeBody: ProsConsArgumentativeRequestDto) {
    return this.openaiService.prosConsConsArgumentative(prosConsArgumentativeBody);
  }

  @Post('pros-cons-argumentative-stream')
  async prosConsArgumentativeStream(
      @Body() prosConsArgumentativeBody: ProsConsArgumentativeRequestDto,
      @Res() res: Response
  ) {
    const stream = await this.openaiService.prosConsConsArgumentativeStream(prosConsArgumentativeBody);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);
    for await (const chuck of stream) {
      const piece = chuck.choices[0].delta.content || '';
      res.write(piece);
    }
    res.end();
  }
}
