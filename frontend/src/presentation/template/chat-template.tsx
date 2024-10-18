import { useState } from 'react';
import { GptMessage } from '../components/chat-bubbles/gpt-message.tsx';
import { MyMessage } from '../components/chat-bubbles/my-message.tsx';
import { TypingLoader } from '../components/loader/typing-loader.tsx';
import { ChatInputBox } from '../components/chat-input-boxes/chat-input-box.tsx';

interface Message {
	text: string;
	isGpt: boolean;
}

export const ChatTemplate = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const handlePost = async (text: string) => {
		setIsLoading(true);
		setMessages((prev) => [...prev, { text: text, isGpt: false }]);

		//TODO: UseCase

		setIsLoading(false);

		// Todo: Añadir el mensaje de isGPT en true
	};

	return (
		<div className="chat-container">
			<div className="chat-messages">
				<div className="grid grid-cols-12 gap-y-2">
					{/* Bienvenida */}
					<GptMessage text="Hola, puedes escribir tu texto en español, y te ayudo con las correcciones" />

					{messages.map((message, index) =>
						message.isGpt ? (
							<GptMessage key={index} text="Esto es de OpenAI" />
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

			<ChatInputBox onSendMessage={handlePost} placeholder="Escribe aquí lo que deseas" />
		</div>
	);
};
