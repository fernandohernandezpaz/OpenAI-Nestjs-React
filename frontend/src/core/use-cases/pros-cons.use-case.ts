import {
    ProsConsUseCaseResponseInterface
} from '../../interfaces/pros-cons-use-case-response.interface';
import {ErrorsEnum} from '../../common/enums/ErrorsMessage.enum';

interface ProsConsUseCaseI extends ProsConsUseCaseResponseInterface {
    ok: boolean;
}

export const prosConsUseCase = async (prompt: string): Promise<ProsConsUseCaseI> => {
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

        const data = await response.json() as ProsConsUseCaseResponseInterface;
        return {
            ok: true,
            ...data
        } as ProsConsUseCaseI;
    } catch (error) {
        return {
            ok: false,
            content: ErrorsEnum.SOMETHING_WENT_WRONG,
            refusal: null,
            role: null
        } as unknown as ProsConsUseCaseI;
    }
}
