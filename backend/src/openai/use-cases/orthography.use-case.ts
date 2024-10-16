import OpenAI from "openai";

interface Options {
    prompt: string;
    maxTokens?: number;
}

export interface OpenAIResponse {
    userScore: number;
    errors: string[];
    message: string;
}

export const orthographyUseCase = async (openAI: OpenAI, {prompt, maxTokens}: Options): Promise<OpenAIResponse> => {
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
        max_tokens: maxTokens,
    });
    if (!completion.choices.length) {
        return {} as OpenAIResponse;
    }
    return JSON.parse(completion.choices[0].message.content) as OpenAIResponse;
};
