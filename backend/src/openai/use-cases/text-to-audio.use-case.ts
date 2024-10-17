import OpenAI from 'openai';
import * as path from 'path';
import * as fs from 'fs';
import { Options } from '../interfaces/option-open-ai.interface';
import { VoicesTypeEnum } from '../../common/enums/voices-type.enum';
import { VoicesType } from '../../common/types/voices-type.type';

interface TextToAudioOptions extends Options {
	voice: VoicesType;
}

export const textToAudioUseCase = async (
	openAI: OpenAI,
	{ prompt, voice = VoicesTypeEnum.NOVA }: TextToAudioOptions,
): Promise<string> => {
	try{
        const folderPath = path.resolve(__dirname, '../../..', 'generated');
        const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);
        fs.mkdirSync(folderPath, { recursive: true });
        const audioFile = await openAI.audio.speech.create({
            voice: voice,
            model: 'tts-1',
            input: prompt,
            response_format: 'mp3',
        });
        const buffer = Buffer.from(await audioFile.arrayBuffer());
        await fs.promises.writeFile(speechFile, buffer);
        return speechFile;
    } catch (error) {
        error.logger.error()
        return '';
    }
};
