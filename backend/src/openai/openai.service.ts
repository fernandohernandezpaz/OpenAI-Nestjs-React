import { Injectable } from '@nestjs/common';
import { orthographyUseCase } from './use-cases';
import { OrthographyRequestDto } from './dtos';
import OpenAI from "openai";
import * as process from "node:process";

@Injectable()
export class OpenaiService {
  private openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  async orthographyCheck(orthographyBody: OrthographyRequestDto) {
    const { prompt } = orthographyBody;
    return await orthographyUseCase(this.openAI, { prompt});
  }
}
