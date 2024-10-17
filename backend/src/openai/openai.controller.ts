import { Response } from 'express';
import {Body, Controller, HttpStatus, Param, Post, Res, Get} from '@nestjs/common';
import { OpenaiService } from './openai.service';
import {
	OrthographyRequestDto,
	ProsConsArgumentativeRequestDto,
	TranslateRequestDto,
	OpenaiOrthographyResponseDto,
	TextToAudioRequestDto,
} from './dtos';

@Controller('openai')
export class OpenaiController {
	constructor(private readonly openaiService: OpenaiService) {}

	@Post('orthography-check')
	orthographyCheck(
		@Body() orthographyBody: OrthographyRequestDto,
	): Promise<OpenaiOrthographyResponseDto> {
		return this.openaiService.orthographyCheck(orthographyBody);
	}

	@Post('pros-cons-argumentative')
	prosConsArgumentative(@Body() prosConsArgumentativeBody: ProsConsArgumentativeRequestDto) {
		return this.openaiService.prosConsConsArgumentative(prosConsArgumentativeBody);
	}

	@Post('pros-cons-argumentative-stream')
	async prosConsArgumentativeStream(
		@Body() prosConsArgumentativeBody: ProsConsArgumentativeRequestDto,
		@Res() res: Response,
	) {
		const stream =
			await this.openaiService.prosConsConsArgumentativeStream(prosConsArgumentativeBody);
		res.setHeader('Content-Type', 'application/json');
		res.status(HttpStatus.OK);
		for await (const chuck of stream) {
			const piece = chuck.choices[0].delta.content || '';
			res.write(piece);
		}
		res.end();
	}

	@Post('translate')
	translate(@Body() translateBody: TranslateRequestDto) {
		return this.openaiService.translate(translateBody);
	}

	@Post('text-to-audio')
	async textToAudio(
        @Body() textToAudioBody: TextToAudioRequestDto,
        @Res() response: Response
    ) {
		const speechFile = await this.openaiService.textToAudio(textToAudioBody);
        response.setHeader('Content-Type', 'audio/mp3');
        response.status(HttpStatus.OK);
        response.sendFile(speechFile);
	}

    @Get('get-audio-file/:fileId')
    async getAudioFile(
        @Param('fileId') fileId: string,
        @Res() response: Response,
    ) {
        const speechFile = await this.openaiService.getAudioFile(fileId);
        response.setHeader('Content-Type', 'audio/mp3');
        response.status(HttpStatus.OK);
        response.sendFile(speechFile);
    }
}
