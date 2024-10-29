import {GetMessageThreadResponseInterface} from '../../interfaces';

export const getMessageThreadUseCase = async (
    threadId: string | null,
    prompt: string,
): Promise<Record<string, string>[]> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sam-assistant/create-message-thread/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({threadId, prompt}),
        });
        return (await response.json() as GetMessageThreadResponseInterface[])
            ?.map(({role, content}) => ({
                role,
                content: content.pop() ?? '',
            }));
    } catch (error) {
        console.log(error);
        return [];
    }
}
