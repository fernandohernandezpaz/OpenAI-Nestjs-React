import * as fs from 'fs';
import * as path from 'path';
import * as process from 'node:process';

import OpenAI from 'openai';

import { Options } from '../interfaces/option-open-ai.interface';
import { OpenaiImageHandlerResponseDto } from '../dtos';

import { downloaderFile, downloadBase64ImageAsPng } from '../../common/helpers/downloader-file';
import {generateAssetUrl} from "../../common/helpers/generate-asset-url";

interface ImageGeneratorOption extends Options {
	originalImage?: string;
	maskImage?: string;
}

export const imageGeneratorUseCase = async (
	openAI: OpenAI,
	{ prompt, originalImage, maskImage }: ImageGeneratorOption,
): Promise<OpenaiImageHandlerResponseDto> => {
	try {
		if (!originalImage || !maskImage) {
			const response = await openAI.images.generate({
				prompt,
				model: 'dall-e-3',
				n: 1,
				size: '1024x1024', // produces more cost
				quality: 'standard',
				response_format: 'url',
			});

			const firstImage = response.data.shift();
			const { url: openAIUrl, revised_prompt } = firstImage;
			const fileName = await downloaderFile(openAIUrl);
            const url = generateAssetUrl(fileName);

			return {
				url,
				openAIUrl,
				revisedPrompt: revised_prompt,
			};
		}

		const pngImagePath = await downloaderFile(originalImage);
		const maskPath = await downloadBase64ImageAsPng(maskImage);
		const response = await openAI.images.edit({
			model: 'dall-e-3',
			prompt,
			image: fs.createReadStream(pngImagePath),
			mask: fs.createReadStream(maskPath),
			n: 1,
			size: '1024x1024',
			response_format: 'url',
		});
		const firstImage = response.data.shift();
		const { url:openAIUrl, revised_prompt } = firstImage;
		const fileName = path.basename(openAIUrl);
        const url = generateAssetUrl(fileName);

		return {
			url,
			openAIUrl,
			revisedPrompt: revised_prompt,
		};
	} catch (error) {
		return {
			url: null,
			openAIUrl: null,
			revisedPrompt: null,
		};
	}
};
