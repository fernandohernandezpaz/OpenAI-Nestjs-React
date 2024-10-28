import OpenAI from 'openai';
import * as process from 'node:process';

import { Injectable } from '@nestjs/common';

import { CreateMessageRequestDto } from './dtos';
import {
	createMessageThreadUseCase,
	createRunUseCase,
	createThreadUseCase,
	checkCompleteStatusUseCase,
} from './use-cases';

@Injectable()
export class SamAssistantService {
	private openAI = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	});
	async createThread() {
		return await createThreadUseCase(this.openAI);
	}

	async createMessageThread({ threadId, prompt }: CreateMessageRequestDto) {
		const message = await createMessageThreadUseCase(this.openAI, { threadId, prompt });

		const { assistant_id: assistantId } = message;

		const run = await createRunUseCase(this.openAI, { assistantId, threadId });
		const { id: runId } = run;
		return checkCompleteStatusUseCase(this.openAI, { runId, threadId });
	}
}
