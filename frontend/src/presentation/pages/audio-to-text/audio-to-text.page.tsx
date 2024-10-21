import { useState } from 'react';
import { GptMessage } from '../../components/chat-bubbles/gpt-message.tsx';
import { MyMessage } from '../../components/chat-bubbles/my-message.tsx';
import { TypingLoader } from '../../components/loader/typing-loader.tsx';
import { CustomChatInputFileBox } from '../../components/chat-input-boxes/custom-chat-input-file-box.tsx';
import { audioToTextUseCase } from '../../../core/use-cases';

interface Message {
	text: string;
	isGpt: boolean;
	fileUploaded?: boolean;
}

export const AudioToTextPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const handlePost = async (text: string, audioFile: File) => {
		setIsLoading(true);
		setMessages((prev) => [...prev, { text: text, isGpt: false, fileUploaded: true }]);

		const resp = await audioToTextUseCase(audioFile, text);
		setIsLoading(false);
		if (!resp) return;
		const gptMessage: string = `
        ### Transcription:
        __Duration: ${Math.round(resp.duration)} seconds
        ## The text is:
        ${resp.text}
        `;

		setMessages((prev) => [...prev, { text: gptMessage, isGpt: true, fileUploaded: false }]);
	};

	return (
		<div className="chat-container">
			<div className="chat-messages">
				<div className="grid grid-cols-12 gap-y-2">
					<GptMessage text="Would you like to transform an audio to text?" />

					{messages.map((message, index) =>
						message.isGpt ? (
							<GptMessage key={index} text={message.text} />
						) : (
							<MyMessage
								key={index}
								text={message.text}
								showIcon={message.fileUploaded}
								iconName={'Audio File'}
							/>
						),
					)}

					{isLoading && (
						<div className="col-start-1 col-end-12 fade-in">
							<TypingLoader />
						</div>
					)}
				</div>
			</div>

			<CustomChatInputFileBox
				onSendMessage={handlePost}
				placeholder="Write here. What do you want ?"
				accept={'audio/*'}
			/>
		</div>
	);
};
