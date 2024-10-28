import OpenAI from 'openai';

import { OpenaiCreateMessageThreadResponseDto } from '../dtos';

interface CreateMessageThreadUseCaseOption {
	threadId: string;
	prompt: string;
}

export const createMessageThreadUseCase = async (
	openAI: OpenAI,
	{ threadId, prompt }: CreateMessageThreadUseCaseOption,
): Promise<OpenaiCreateMessageThreadResponseDto> => {
	return (await openAI.beta.threads.messages.create(threadId, {
		role: 'user',
		content: prompt,
	})) as unknown as OpenaiCreateMessageThreadResponseDto;
};
