import { TextToAudioUseCaseResponseInterface } from '../../interfaces/text-to-audio-use-case-response.interface';
import { ErrorsEnum } from '../../common/enums/ErrorsMessage.enum';

interface TextToAudioUseCaseI extends TextToAudioUseCaseResponseInterface {
	ok: boolean;
}

export const textToAudioUseCase = async (
	prompt: string,
	voice: string,
): Promise<TextToAudioUseCaseI> => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/openai/text-to-audio/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ prompt, voice }),
		});
		if (!response.ok) {
			throw new Error(ErrorsEnum.SOMETHING_WENT_WRONG);
		}
		const audioFile = await response.blob();
		const audioUrl = URL.createObjectURL(audioFile);
		return {
			ok: true,
			audioUrl,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			audioUrl: '',
		};
	}
};
