import OpenAI from 'openai';

import { OpenaiCreateMessageThreadResponseDto } from '../dtos';
import { run } from 'jest';

interface CheckCompleteStatusUseCaseOption {
	threadId: string;
	runId: string;
}

export const checkCompleteStatusUseCase = async (
	openAI: OpenAI,
	{ threadId, runId }: CheckCompleteStatusUseCaseOption,
) => {
	const response = await openAI.beta.threads.runs.retrieve(threadId, runId);

	const { status } = response;

	if (status === 'completed') {
		return response.status;
	}

	await new Promise((resolve) => setTimeout(resolve, 1000));

	return await checkCompleteStatusUseCase(openAI, { threadId, runId });
};
