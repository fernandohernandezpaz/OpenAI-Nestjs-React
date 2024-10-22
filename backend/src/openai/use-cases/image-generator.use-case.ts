import OpenAI from 'openai';
import { Options } from '../interfaces/option-open-ai.interface';
import {downloaderFile} from "../../common/helpers/downloader-file";

interface ImageGeneratorOption extends Options {
    originalImage?: string;
    maskImage?: string;
}

export const imageGeneratorUseCase = async (
	openAI: OpenAI,
	{ prompt, originalImage, maskImage }: ImageGeneratorOption,
) => {
	try {
        const response = await openAI.images.generate({
            prompt,
            model: 'dall-e-3',
            n: 1,
            size: '1024x1024', // produces more cost
            quality: 'standard',
            response_format: 'url',
        });

        const firstImage = response.data.shift();
        const { url, revised_prompt } = firstImage;
        const filePath = await downloaderFile(url);


        return {
            url: url,
            localPath: filePath,
            revisedPrompt: revised_prompt,
        };
    } catch (error) {
        return {};
    }
};
