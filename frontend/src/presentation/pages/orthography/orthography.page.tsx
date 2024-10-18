import { useState } from 'react';
import { GptMessage } from '../../components/chat-bubbles/gpt-message.tsx';
import { GptOrthographyMessage } from '../../components/chat-bubbles/gpt-orthography-message.tsx';
import { MyMessage } from '../../components/chat-bubbles/my-message.tsx';
import { TypingLoader } from '../../components/loader/typing-loader.tsx';
import { ChatInputBox } from '../../components/chat-input-boxes/chat-input-box.tsx';
import { orthographyUseCase } from '../../../core/use-cases';
import { OrthographyUseCaseResponseInterface } from '../../../interfaces/orthography-use-case-response.interface';
import { MessageInterface } from '../../../common/interfaces/message.interface.ts';

interface Message extends MessageInterface {
	info?: OrthographyUseCaseResponseInterface;
}

export const OrthographyPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const handlePost = async (text: string) => {
		setIsLoading(true);
		setMessages((prev) => [...prev, { text: text, isGpt: false }]);

		const { errors, message, ok, userScore } = await orthographyUseCase(text);
		setIsLoading(false);
		if (!ok) {
			setMessages((prev) => [...prev, { text: message, isGpt: true }]);
			return;
		}
		setMessages((prev) => [
			...prev,
			{
				text: message,
				isGpt: true,
				info: {
					errors,
					message,
					userScore,
				},
			},
		]);
	};

	return (
		<div className={'chat-container'}>
			<h1>Orthography</h1>
			<div className={'chat-messages'}>
				<div className={'grid grid-cols-12 gap-y-2'}>
					<GptMessage text={'Welcome, How can I help you?'} />
					{messages.map(({ text, isGpt, info }, index) =>
						isGpt ? (
							<GptOrthographyMessage
								key={index}
								message={info!.message}
								userScore={info!.userScore}
								errors={info?.errors ?? []}
							/>
						) : (
							<MyMessage key={index} username={'Fer'} text={text} />
						),
					)}
					{isLoading && (
						<div className={'col-start-1 col-end-12 fade-in'}>
							<TypingLoader />
						</div>
					)}
				</div>
			</div>
			<ChatInputBox onSendMessage={handlePost} placeholder={'Write here your message'} />
		</div>
	);
};
