import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';
import { Options } from '../interfaces/option-open-ai.interface';
import {downloaderFile, downloadBase64ImageAsPng} from "../../common/helpers/downloader-file";
import * as url from "node:url";
import * as process from "node:process";

interface ImageGeneratorOption extends Options {
    originalImage?: string;
    maskImage?: string;
}

export const imageGeneratorUseCase = async (
	openAI: OpenAI,
	{ prompt, originalImage, maskImage }: ImageGeneratorOption,
) => {
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
            const { url, revised_prompt } = firstImage;
            const fileName = await downloaderFile(url);
            const publicUrl = `${process.env.SERVER_URL}/openai/get-image-generated/${fileName}`;

            return {
                url: publicUrl,
                openAIUrl: url,
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
            response_format: 'url'
        });
        const firstImage = response.data.shift();
        const { url, revised_prompt } = firstImage;
        const fileName = path.basename(url);
        const publicUrl = `${process.env.SERVER_URL}/openai/get-image-generated/${fileName}`;

        return {
            url: publicUrl,
            openAIUrl: url,
            revisedPrompt: revised_prompt,
        };
    } catch (error) {
        return {};
    }
};
