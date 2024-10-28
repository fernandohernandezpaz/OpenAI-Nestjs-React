import { Body, Controller, Post } from '@nestjs/common';
import { SamAssistantService } from './sam-assistant.service';
import { CreateMessageRequestDto } from './dtos';

@Controller('sam-assistant')
export class SamAssistantController {
	constructor(private readonly samAssistantService: SamAssistantService) {}

	@Post('create-thread')
	createThread() {
		return this.samAssistantService.createThread();
	}

	@Post('create-message-thread')
	createMessageThread(@Body() createMessageThreadBody: CreateMessageRequestDto) {
		return this.samAssistantService.createMessageThread(createMessageThreadBody);
	}
}
