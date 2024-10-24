import { ImageGenerationUseCaseResponseInterface } from '../../interfaces';
import { ErrorsEnum } from '../../common/enums/ErrorsMessage.enum';

export const imageGenerationUseCase = async (
	prompt: string,
	originalImage?: string,
	maskImage?: string,
) => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/openai/image-generator/`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt, originalImage, maskImage }),
			},
		);
		if (!response.ok) {
			throw new Error(ErrorsEnum.SOMETHING_WENT_WRONG);
		}

		const { url, revisedPrompt: alt } =
			(await response.json()) as ImageGenerationUseCaseResponseInterface;
		return {
			ok: true,
			url,
			alt,
		};
	} catch (error) {
		return {
			ok: false,
			url: '',
			alt: '',
		};
	}
};
