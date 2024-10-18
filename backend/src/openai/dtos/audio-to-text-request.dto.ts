import { IsOptional, IsString } from 'class-validator';

export class AudioToTextRequestDto {
	@IsString()
	@IsOptional()
	readonly prompt: string;
}
