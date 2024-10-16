import OpenAI from 'openai';
import { OpenaiOrthographyResponseDto} from '../dtos';
import {Options  } from '../interfaces/option-open-ai.interface';



export const orthographyUseCase = async (openAI: OpenAI, {prompt}: Options): Promise<OpenaiOrthographyResponseDto> => {
    const completion = await openAI.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: `
                You will be provided with texts in Spanish with possible spelling and grammatical errors. 
                The words used must exist in the dictionary of the Royal Spanish Academy. 
                You must respond in JSON format.
                Your task is to correct them and return information and solutions. 
                You must also give a percentage of correct answers for the user.
                If there are no errors, you must return a congratulatory message.
                Example output: 
                {
                    userScore: number,
                    errors: string[], //['error -> solution']
                    message: string, // Use emojis and text to congratulate the user
                }
                `
            },
            {
                role: 'user',
                content: prompt,
            }
        ],
        model: 'gpt-4',
        temperature: 0.2,
        max_tokens: 150,
    });
    if (!completion.choices.length) {
        return {} as OpenaiOrthographyResponseDto;
    }
    return JSON.parse(completion.choices[0].message.content) as OpenaiOrthographyResponseDto;
};
