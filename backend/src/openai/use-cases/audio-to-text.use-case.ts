import OpenAI from 'openai';
import * as path from 'path';
import * as fs from 'fs';

interface AudioToTextOptions {
	prompt?: string;
	audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async (
	openAI: OpenAI,
	{ prompt, audioFile }: AudioToTextOptions,
) => {
	try {
		return await openAI.audio.transcriptions.create({
			model: 'whisper-1',
			file: fs.createReadStream(audioFile.path),
			prompt, // same idiom
			language: 'es',
			response_format: 'verbose_json',
		});
	} catch (error) {
		error.logger.error();
		return {};
	}
};
