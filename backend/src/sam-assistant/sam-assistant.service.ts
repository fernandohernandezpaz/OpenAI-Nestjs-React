import OpenAI from 'openai';
import * as process from 'node:process';

import { Injectable } from '@nestjs/common';

import { CreateMessageRequestDto } from './dtos';
import {
	createMessageThreadUseCase,
	createRunUseCase,
	createThreadUseCase,
	checkCompleteStatusUseCase,
    getMessageListUseCase
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

        await checkCompleteStatusUseCase(this.openAI, { runId, threadId });

        const messages = await getMessageListUseCase(this.openAI, {threadId});
        return messages.reverse();

	}
}
