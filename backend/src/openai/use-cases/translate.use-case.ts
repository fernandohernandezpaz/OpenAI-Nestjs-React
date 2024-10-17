import OpenAI from 'openai';
// import { } from '../../com'
import { Options } from '../interfaces/option-open-ai.interface';

import { OpenaiTranslateResponseDto } from '../dtos';

interface TranslateOptions extends Options {
	lang: string;
}

export const translateUseCase = async (openAI: OpenAI, { prompt, lang }: TranslateOptions) => {
	try {
		const completion = await openAI.chat.completions.create({
			messages: [
				{
					role: 'system',
					content: `
                         You must respond in JSON format.
                         Your task is translate the following text "${prompt}" to ${lang}, 
                         and if there are not errors.Please return
                         Example output:
                         {
                            originalText: string,
                            translateText: string
                         }
                `,
				},
			],
			model: 'gpt-4',
			temperature: 0.1,
			max_tokens: 150,
		});
		if (!completion.choices.length) {
			return {} as OpenaiTranslateResponseDto;
		}

		const data = JSON.parse(completion.choices[0].message.content);
		return data as OpenaiTranslateResponseDto;
	} catch (error) {
		console.log(error);
		return {
			originalText: '',
			translateTet: '',
		} as unknown as OpenaiTranslateResponseDto;
	}
};
