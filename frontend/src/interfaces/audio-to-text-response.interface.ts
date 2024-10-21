import { Segment } from './segment.interface.ts';

export interface AudioToTextResponseInterface {
	task: string;
	language: string;
	duration: number;
	text: string;
	segments: Segment[];
}
