import { IsString } from 'class-validator';

export class ProsConsArgumentativeRequestDto {
	@IsString()
	readonly prompt: string;
}
