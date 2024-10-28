export interface OpenaiCreateThreadResponseDto {
	id: string;
	object: string;
	created_at: Date;
	metadata: Record<string, any>;
	tool_resources: Record<string, any>;
}
