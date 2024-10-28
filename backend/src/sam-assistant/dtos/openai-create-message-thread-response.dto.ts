interface Text {
	value: string;
	annotations: string[];
}

interface Content {
	type: string;
	text: Text[];
}

export interface OpenaiCreateMessageThreadResponseDto {
	id: string;
	object: string;
	created_at: Date;
	assistant_id?: string;
	thread_id: string;
	run_id?: string;
	role: string;
	content: Content;
	attachments: string[];
	metadata: Record<string, any>;
}
