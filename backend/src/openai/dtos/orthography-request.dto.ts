import { IsInt, IsOptional, IsString } from 'class-validator';

export class OrthographyRequestDto {
  @IsString()
  readonly prompt: string;

  @IsInt()
  @IsOptional()
  readonly maxTokens?: number;
}
