import * as fs from 'fs';
import OpenAI from 'openai';
import { OpenaiImageHandlerResponseDto } from '../dtos';
import { downloaderFile } from '../../common/helpers/downloader-file';
import { generateAssetUrl } from '../../common/helpers/generate-asset-url';

interface ImageVariationUseCaseOption {
	baseImage: string;
}

export const imageVariationUseCase = async (
	openAI: OpenAI,
	{ baseImage }: ImageVariationUseCaseOption,
): Promise<OpenaiImageHandlerResponseDto> => {
	try {
		const imagePath = await downloaderFile(baseImage, true);
		const variation = await openAI.images.createVariation({
			model: 'dall-e-2',
			image: fs.createReadStream(imagePath),
			n: 1,
			size: '1024x1024',
			response_format: 'url',
		});

		const image = variation.data.shift();
		const { url: openAIUrl, revised_prompt } = image;
		const fileName = await downloaderFile(openAIUrl);
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
