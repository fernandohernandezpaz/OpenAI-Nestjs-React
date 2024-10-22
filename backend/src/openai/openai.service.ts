import * as process from 'node:process';
import * as path from 'path';
import * as fs from 'node:fs';

import OpenAI from 'openai';

import { Injectable, NotFoundException } from '@nestjs/common';
import {
	orthographyUseCase,
	prosConsArgumentativeUseCase,
	prosConsArgumentativeStreamUseCase,
	translateUseCase,
	textToAudioUseCase,
	audioToTextUseCase,
	imageGeneratorUseCase,
	imageVariationUseCase,
} from './use-cases';
import {
	AudioToTextRequestDto,
	ImageGeneratedVariationRequestDto,
	ImageGeneratorRequestDto,
	OrthographyRequestDto,
	ProsConsArgumentativeRequestDto,
	TextToAudioRequestDto,
	TranslateRequestDto,
} from './dtos';

@Injectable()
export class OpenaiService {
	private openAI = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	});

	async orthographyCheck(orthographyBody: OrthographyRequestDto) {
		const { prompt } = orthographyBody;
		return await orthographyUseCase(this.openAI, { prompt });
	}

	async prosConsConsArgumentative(prosConsArgumentativeBody: ProsConsArgumentativeRequestDto) {
		const { prompt } = prosConsArgumentativeBody;
		return await prosConsArgumentativeUseCase(this.openAI, { prompt });
	}

	prosConsConsArgumentativeStream(prosConsArgumentativeBody: ProsConsArgumentativeRequestDto) {
		const { prompt } = prosConsArgumentativeBody;
		return prosConsArgumentativeStreamUseCase(this.openAI, { prompt });
	}

	async translate(translateBody: TranslateRequestDto) {
		const { prompt, lang } = translateBody;
		return await translateUseCase(this.openAI, { prompt, lang });
	}

	async textToAudio({ prompt, voice }: TextToAudioRequestDto) {
		return await textToAudioUseCase(this.openAI, { prompt, voice });
	}

	async getAudioFile(fileId: string) {
		const filePath = path.resolve(__dirname, '../../', 'generated', `${fileId}.mp3`);
		const wasFound = fs.existsSync(filePath);
		if (!wasFound) {
			throw new NotFoundException(`File ${fileId}.mp3 not found`);
		}
		return filePath;
	}

	async audioToText(audioFile: Express.Multer.File, audioToTextBody: AudioToTextRequestDto) {
		const { prompt } = audioToTextBody;
		return audioToTextUseCase(this.openAI, { audioFile, prompt });
	}

	async imageGenerator(imageGeneratorBody: ImageGeneratorRequestDto) {
		return await imageGeneratorUseCase(this.openAI, imageGeneratorBody);
	}

	getImageGenerated(fileName: string) {
		const filePath = path.resolve(__dirname, '../../', 'generated/images', `${fileName}`);
		const wasFound = fs.existsSync(filePath);
		if (!wasFound) {
			throw new NotFoundException(`File ${fileName} not found`);
		}
		return filePath;
	}

	async imageVariation(imageGeneratedVariationBody: ImageGeneratedVariationRequestDto) {
		return await imageVariationUseCase(this.openAI, imageGeneratedVariationBody);
	}
}
