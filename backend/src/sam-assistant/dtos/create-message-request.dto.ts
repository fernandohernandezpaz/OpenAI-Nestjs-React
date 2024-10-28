import { IsString } from 'class-validator';

export class CreateMessageRequestDto {
	@IsString()
	threadId: string;

	@IsString()
	readonly prompt: string;
}
