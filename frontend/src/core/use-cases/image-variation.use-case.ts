import { ImageGenerationUseCaseResponseInterface } from '../../interfaces';
import { ErrorsEnum } from '../../common/enums/ErrorsMessage.enum';

export const imageVariationUseCase = async (originalImage: string) => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/openai/image-variation/`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ baseImage: originalImage }),
			},
		);
		if (!response.ok) {
			throw new Error(ErrorsEnum.SOMETHING_WENT_WRONG);
		}

		const { url, revisedPrompt: alt } =
			(await response.json()) as ImageGenerationUseCaseResponseInterface;

		if (!url) {
			throw new Error(ErrorsEnum.SOMETHING_WENT_WRONG);
		}
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
