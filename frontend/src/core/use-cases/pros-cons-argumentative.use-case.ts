import {
    ProsConsArgumentativeUseCaseResponseInterface
} from '../../interfaces/pros-cons-argumentative-use-case-response.interface';
import {ErrorsEnum} from '../../common/enums/ErrorsMessage.enum';

interface ProsConsArgumentativeUseCaseI extends ProsConsArgumentativeUseCaseResponseInterface {
    ok: boolean;
}

export const prosConsArgumentativeUseCase = async (prompt: string): Promise<ProsConsArgumentativeUseCaseI> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/openai/pros-cons-argumentative/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt})
        });
        if (!response.ok) {
            throw new Error(ErrorsEnum.SOMETHING_WENT_WRONG)
        }

        const data = await response.json() as ProsConsArgumentativeUseCaseResponseInterface;
        return {
            ok: true,
            ...data
        } as ProsConsArgumentativeUseCaseI;
    } catch (error) {
        return {
            ok: false,
            content: ErrorsEnum.SOMETHING_WENT_WRONG,
            refusal: null,
            role: null
        } as unknown as ProsConsArgumentativeUseCaseI;
    }
}
