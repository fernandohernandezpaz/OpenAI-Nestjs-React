import OpenAI from 'openai';


interface CheckCompleteStatusUseCaseOption {
	threadId: string;
	runId: string;
}

export const checkCompleteStatusUseCase = async (
	openAI: OpenAI,
	{ threadId, runId }: CheckCompleteStatusUseCaseOption,
): Promise<boolean> => {
	const response = await openAI.beta.threads.runs.retrieve(threadId, runId);

	const { status } = response;

	if (status === 'completed') {
		return true;
	}

    if (status === 'failed') {
        return false
    }

	await new Promise((resolve) => setTimeout(resolve, 1000));

	return await checkCompleteStatusUseCase(openAI, { threadId, runId });
};
