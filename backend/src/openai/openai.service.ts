import * as process from 'node:process';

import OpenAI from 'openai';

import { Injectable } from '@nestjs/common';
import { orthographyUseCase, prosConsArgumentativeUseCase,prosConsArgumentativeStreamUseCase } from './use-cases';
import { OrthographyRequestDto, ProsConsArgumentativeRequestDto } from './dtos';

@Injectable()
export class OpenaiService {

  private openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck(orthographyBody: OrthographyRequestDto) {
    const { prompt } = orthographyBody;
    return await orthographyUseCase(this.openAI, { prompt});
  }

  async prosConsConsArgumentative(prosConsArgumentativeBody: ProsConsArgumentativeRequestDto) {
    const { prompt } = prosConsArgumentativeBody;
    return await prosConsArgumentativeUseCase(this.openAI, { prompt});
  }

  async prosConsConsArgumentativeStream(prosConsArgumentativeBody: ProsConsArgumentativeRequestDto) {
    const { prompt } = prosConsArgumentativeBody;
    return await prosConsArgumentativeStreamUseCase(this.openAI, { prompt});
  }
}
