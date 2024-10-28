import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { OpenaiModule } from './openai/openai.module';
import { SamAssistantModule } from './sam-assistant/sam-assistant.module';

@Module({
	imports: [ConfigModule.forRoot(), OpenaiModule, SamAssistantModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
