import {ErrorsEnum} from '../../common/enums/ErrorsMessage.enum';


export async function* prosConsStreamGeneratorUseCase(prompt: string, abortSignal: AbortSignal): AsyncGenerator<string | null> {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/openai/pros-cons-argumentative-stream/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt}),
            signal: abortSignal
        });
        if (!response.ok) {
            console.log(ErrorsEnum.SOMETHING_WENT_WRONG);
            return null;
        }
        const reader = response.body?.getReader();
        if (!reader) {
            console.log(ErrorsEnum.READER_CAN_NOT_BE_GENERATED);
            return null;
        }
        const textDecoder = new TextDecoder();
        let textResponse: string = ''
        while (true) {
            const {value, done} = await reader.read();
            if (done) {
                break;
            }

            textResponse += textDecoder.decode(value, {stream: true});
            yield textResponse;
        }
    } catch (error) {
        return null;
    }
}
