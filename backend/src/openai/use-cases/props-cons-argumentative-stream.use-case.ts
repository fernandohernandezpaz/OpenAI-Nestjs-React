import OpenAI from 'openai';
import { Options } from '../interfaces/option-open-ai.interface';

export const prosConsArgumentativeStreamUseCase = async (openAI: OpenAI, { prompt }: Options) => {
	return openAI.chat.completions.create({
		stream: true,
		messages: [
			{
				role: 'system',
				content: `
                You will be given a question and your task is to give an answer with pros and cons.
                The answer must be in markdown format.
                The pros and cons must be in a list,
                `,
			},
			{
				role: 'user',
				content: prompt,
			},
		],
		model: 'gpt-4',
		temperature: 0.4,
		max_tokens: 1200,
	});
};
