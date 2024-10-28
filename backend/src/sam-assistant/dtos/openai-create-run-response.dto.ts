interface RankingOption {
	ranker: string;
	score_threshold: number;
}

interface FileSearch {
	max_num_results: number;
	ranking_options: RankingOption;
}

interface Tool {
	type: string;
	file_search: FileSearch;
}

interface TruncationStrategy {
	type: string;
	last_message?: string;
}

interface ResponseFormat {
	type: string;
}

export interface OpenaiCreateRunResponseDto {
	id: string;
	object: string;
	created_at: Date;
	assistant_id: string;
	thread_id: string;
	status: string;
	started_at?: Date;
	expiry_at: Date;
	cancelled_at?: Date;
	failed_at?: Date;
	completed_at?: Date;
	required_action?: string;
	last_error?: string;
	model: string;
	instructions: string;
	tools: Tool[];
	tool_resources: Record<string, any>;
	metadata: Record<string, any>;
	temperature: number;
	top_p: number;
	max_completion_tokens?: number;
	max_prompt_tokens?: number;
	truncation_strategy: TruncationStrategy;
	incomplete_details?: any;
	usage?: number;
	response_format: ResponseFormat;
	tool_choice: string;
	parallel_tool_calls: boolean;
}
