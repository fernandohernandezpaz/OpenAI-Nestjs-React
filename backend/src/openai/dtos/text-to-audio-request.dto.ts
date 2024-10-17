import { IsOptional, IsString } from 'class-validator';
import { VoicesType } from '../../common/types/voices-type.type';

export class TextToAudioRequestDto {
	@IsString()
	readonly prompt: string;

	@IsString()
	@IsOptional()
	readonly voice?: VoicesType;
}
