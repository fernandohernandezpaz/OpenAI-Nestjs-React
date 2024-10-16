import OpenAI from 'openai';
import {OpenaiProsConsResponseDto} from '../dtos'
import {Options} from '../interfaces/option-open-ai.interface';


export const prosConsArgumentativeUseCase = async (openAI: OpenAI, {prompt}: Options): Promise<OpenaiProsConsResponseDto> => {
    const completion = await openAI.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: `
                You will be given a question and your task is to give an answer with pros and cons.
                The answer must be in markdown format.
                The pros and cons must be in a list,
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
        return {} as OpenaiProsConsResponseDto;
    }
    const data = completion.choices[0].message;
    return {
        role: data?.role,
        content: data?.content,
        refusal: data?.refusal,
    } as OpenaiProsConsResponseDto;
};
