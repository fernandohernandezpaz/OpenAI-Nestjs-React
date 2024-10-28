import OpenAI from 'openai';
import { OpenaiCreateThreadResponseDto } from '../dtos';

export const createThreadUseCase = async (
	openAI: OpenAI,
): Promise<OpenaiCreateThreadResponseDto> => {
	return openAI.beta.threads.create() as unknown as OpenaiCreateThreadResponseDto;
};
