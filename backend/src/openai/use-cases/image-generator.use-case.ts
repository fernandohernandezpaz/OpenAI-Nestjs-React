import * as fs from 'fs';

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
	{
        prompt,
        originalImage,
        maskImage
    }: ImageGeneratorOption,
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

		const pngImagePath = await downloaderFile(originalImage, true);
		const maskPath = await downloadBase64ImageAsPng(maskImage, true);
		const response = await openAI.images.edit({
			model: 'dall-e-2',
			prompt,
			image: fs.createReadStream(pngImagePath),
			mask: fs.createReadStream(maskPath),
			n: 1,
			size: '1024x1024',
			response_format: 'url',
		});
		const firstImage = response.data.shift();
		const { url:openAIUrl, revised_prompt } = firstImage;
        const fileName = await downloaderFile(openAIUrl);
        const url = generateAssetUrl(fileName);

		return {
			url,
			openAIUrl,
			revisedPrompt: revised_prompt,
		};
	} catch (error) {
        console.log(error);
        return {
			url: null,
			openAIUrl: null,
			revisedPrompt: null,
		};
	}
};
