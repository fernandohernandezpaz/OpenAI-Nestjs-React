import OpenAI from 'openai';
import * as process from 'node:process';
import { OpenaiCreateRunResponseDto } from '../dtos';

interface CreateRunUseCaseOption {
	assistantId?: string | undefined;
	threadId: string;
}

export const createRunUseCase = async (
	openAI: OpenAI,
	{ assistantId, threadId }: CreateRunUseCaseOption,
): Promise<OpenaiCreateRunResponseDto> => {
	return openAI.beta.threads.runs.create(threadId, {
		assistant_id: assistantId ?? process.env.ASSISTANT_ID,
		// instructions
	}) as unknown as OpenaiCreateRunResponseDto;
};
