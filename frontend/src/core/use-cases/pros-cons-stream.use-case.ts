import {ErrorsEnum} from '../../common/enums/ErrorsMessage.enum';


export const prosConsStreamUseCase = async (prompt: string): Promise<ReadableStreamDefaultReader |  null> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/openai/pros-cons-argumentative-stream/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt})
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
        return reader;
    } catch (error) {
        return null;
    }
}
