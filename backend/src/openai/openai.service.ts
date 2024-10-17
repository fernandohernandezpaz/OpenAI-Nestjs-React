import * as process from 'node:process';

import OpenAI from 'openai';

import { Injectable } from '@nestjs/common';
import {
  orthographyUseCase,
  prosConsArgumentativeUseCase,
  prosConsArgumentativeStreamUseCase,
  translateUseCase
} from './use-cases';
import {OrthographyRequestDto, ProsConsArgumentativeRequestDto, TranslateRequestDto} from './dtos';

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

  prosConsConsArgumentativeStream(prosConsArgumentativeBody: ProsConsArgumentativeRequestDto) {
    const { prompt } = prosConsArgumentativeBody;
    return prosConsArgumentativeStreamUseCase(this.openAI, { prompt});
  }

  async translate(translateBody: TranslateRequestDto) {

    const { prompt, lang } = translateBody;

    return await translateUseCase(this.openAI, { prompt, lang});

  }
}
