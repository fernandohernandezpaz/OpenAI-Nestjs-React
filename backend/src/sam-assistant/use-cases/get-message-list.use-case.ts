import OpenAI from 'openai';

import {GetMessageListUseCaseDto} from '../dtos';


interface GetMessageListUseCaseOption {
    threadId: string;
}

export const getMessageListUseCase = async (
    openAI: OpenAI,
    {threadId}: GetMessageListUseCaseOption,
): Promise<GetMessageListUseCaseDto[]> => {

    const messageList = await openAI.beta.threads.messages.list(threadId, {});
    return messageList.data.map(({role, content}) => ({
        role,
        content: content.map(_content => (_content as any).text.value),
    }) as unknown as GetMessageListUseCaseDto);

};
