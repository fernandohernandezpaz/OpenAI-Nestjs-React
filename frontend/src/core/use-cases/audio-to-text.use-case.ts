import { ErrorsEnum } from '../../common/enums/ErrorsMessage.enum';
import { AudioToTextResponseInterface } from '../../interfaces/audio-to-text-response.interface';

export const audioToTextUseCase = async (
	audioFile: File,
	prompt: string,
): Promise<AudioToTextResponseInterface | null> => {
	console.log(audioFile);
	const formData: FormData = new FormData();
	formData.append('file', audioFile);
	if (prompt) formData.append('prompt', prompt);

	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/openai/audio-to-text/`, {
			method: 'POST',
			body: formData,
		});
		if (!response.ok) {
			throw new Error(ErrorsEnum.CORRECTION_COULD_NOT_BE_DONE);
		}

		return (await response.json()) as AudioToTextResponseInterface;
	} catch (error) {
		console.log(error);
		return null;
	}
};
