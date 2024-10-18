import { TranslateUseCaseResponseInterface } from '../../interfaces/translate-use-case-response.interface';
import { ErrorsEnum } from '../../common/enums/ErrorsMessage.enum';

interface TranslateUseCaseI extends TranslateUseCaseResponseInterface {
	ok: boolean;
}

export const translateUseCase = async (
	prompt: string,
	lang: string,
): Promise<TranslateUseCaseI> => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/openai/translate/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ prompt, lang }),
		});
		if (!response.ok) {
			throw new Error(ErrorsEnum.SOMETHING_WENT_WRONG_TRANSLATING);
		}

		const data = (await response.json()) as TranslateUseCaseResponseInterface;
		return {
			ok: true,
			...data,
		} as TranslateUseCaseI;
	} catch (error) {
		return {
			ok: false,
			translateText: (error as Error).message,
			originalText: prompt,
		} as TranslateUseCaseI;
	}
};
