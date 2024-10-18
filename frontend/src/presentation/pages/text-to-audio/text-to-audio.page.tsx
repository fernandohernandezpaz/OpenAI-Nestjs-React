import { useState } from 'react';
import { GptMessage } from '../../components/chat-bubbles/gpt-message.tsx';
import { MyMessage } from '../../components/chat-bubbles/my-message.tsx';
import { TypingLoader } from '../../components/loader/typing-loader.tsx';
import { ChatSelectBox } from '../../components/chat-input-boxes/chat-select-box.tsx';
import { textToAudioUseCase } from '../../../core/use-cases';
import { GptAudioMessage } from '../../components/chat-bubbles/gpt-audio.tsx';
import { MessageInterface } from '../../../common/interfaces/message.interface';
import { OptionInterface as Option } from '../../../common/interfaces/option.interface';

const disclaimer: string = `## Enter here the text what you want to convert to audio.
* All the audio generated is by AI.`;

interface TextMessage extends MessageInterface {
	type: 'text';
}

interface AudioMessage extends MessageInterface {
	audioUrl: string;
	type: 'audio';
}

type Message = TextMessage | AudioMessage;

export const TextToAudioPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [voices] = useState<Option[]>([
		{
			id: 'nova',
			text: 'Nova',
		},
		{
			id: 'alloy',
			text: 'Alloy',
		},
		{
			id: 'echo',
			text: 'Echo',
		},
		{
			id: 'fable',
			text: 'Fable',
		},
		{
			id: 'shimmer',
			text: 'Shimmer',
		},
	]);

	const handlePost = async (text: string, selectedOption: string) => {
		setIsLoading(true);
		setMessages((prev) => [...prev, { text: text, isGpt: false, type: 'text' }]);

		if (!text.length) return;
		if (!selectedOption.length) return;

		const { audioUrl, ok } = await textToAudioUseCase(text, selectedOption);
		setIsLoading(false);
		if (!ok) return;

		setMessages((prev) => [...prev, { text, isGpt: true, type: 'audio', audioUrl }]);
	};

	return (
		<div className="chat-container">
			<h1>Text to Audio Page</h1>
			<div className="chat-messages">
				<div className="grid grid-cols-12 gap-y-2">
					<GptMessage text={disclaimer} />

					{messages.map((message: Message, index: number) =>
						message.isGpt ? (
							message.type === 'audio' ? (
								<GptAudioMessage
									key={index}
									text={message.text}
									audioUrl={message.audioUrl}
								/>
							) : (
								<GptMessage key={index} text={message.text} />
							)
						) : (
							<MyMessage key={index} text={message.text} />
						),
					)}

					{isLoading && (
						<div className="col-start-1 col-end-12 fade-in">
							<TypingLoader />
						</div>
					)}
				</div>
			</div>

			<ChatSelectBox
				onSendMessage={handlePost}
				options={voices}
				placeholder="Enter here the text"
			/>
		</div>
	);
};
