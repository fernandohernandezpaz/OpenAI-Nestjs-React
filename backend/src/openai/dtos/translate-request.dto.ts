import { IsString } from 'class-validator';

export class TranslateRequestDto {
  @IsString()
  readonly prompt: string;

  @IsString()
  readonly lang: string;
}
