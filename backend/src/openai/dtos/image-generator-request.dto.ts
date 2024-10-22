import { IsOptional, IsString } from 'class-validator';

export class ImageGeneratorRequestDto {
	@IsString()
	readonly prompt: string;

	@IsString()
	@IsOptional()
	readonly originalImage?: string;

	@IsString()
	@IsOptional()
	readonly maskImage?: string;
}
