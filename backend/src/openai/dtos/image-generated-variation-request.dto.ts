import { IsOptional, IsString } from 'class-validator';

export class ImageGeneratedVariationRequestDto {
	@IsString()
	readonly baseImage: string;
}
