import { OrthographyUseCaseResponseInterface } from '../../interfaces/orthography-use-case-response.interface.ts';
import { ErrorsEnum } from '../../common/enums/ErrorsMessage.enum';

interface OrthographyUseCaseI extends OrthographyUseCaseResponseInterface {
	ok: boolean;
}

export const orthographyUseCase = async (prompt: string): Promise<OrthographyUseCaseI> => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/openai/orthography-check/`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt }),
			},
		);
		if (!response.ok) {
			throw new Error(ErrorsEnum.CORRECTION_COULD_NOT_BE_DONE);
		}

		const data = (await response.json()) as OrthographyUseCaseResponseInterface;
		return {
			ok: true,
			...data,
		} as OrthographyUseCaseI;
	} catch (error) {
		return {
			ok: false,
			userScore: 0,
			errors: [],
			message: ErrorsEnum.CORRECTION_COULD_NOT_BE_DONE,
		} as OrthographyUseCaseI;
	}
};
