import { useState } from 'react';
import { GptMessage } from '../../components/chat-bubbles/gpt-message.tsx';
import { MyMessage } from '../../components/chat-bubbles/my-message.tsx';
import { TypingLoader } from '../../components/loader/typing-loader.tsx';
import { ChatInputBox } from '../../components/chat-input-boxes/chat-input-box.tsx';
import { GptEditableImage } from '../../components/editable-image/gpt-editable-image.tsx';

import { imageGenerationUseCase } from '../../../core/use-cases';

interface Message {
	text: string;
	isGpt: boolean;
	info?: {
		imageUrl?: string;
		alt: string;
	};
}

export const ImageEditorPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [originalImageAndMask, setOriginalImageAndMask] = useState({
		original: undefined as string | undefined,
		mask: undefined as string | undefined,
	});
	const [messages, setMessages] = useState<Message[]>([
		{
			isGpt: true,
			text: 'Image base',
			info: {
				alt: 'Image base',
				imageUrl: 'http://localhost:3000/openai/get-image-generated/1729800230101.png',
			},
		},
	]);

	const handlePost = async (text: string) => {
		setIsLoading(true);
		setMessages((prev) => [...prev, { text: text, isGpt: false }]);
		const { original, mask } = originalImageAndMask;

		const { ok, url: imageUrl, alt } = await imageGenerationUseCase(text, original, mask);
		setIsLoading(false);
		if (!ok) {
			return setMessages((prev) => [
				...prev,
				{ text: 'The image could not be generated', isGpt: true },
			]);
		}
		setMessages((prev) => [
			...prev,
			{
				text: 'Image generated: ',
				isGpt: true,
				info: {
					imageUrl,
					alt,
				},
			},
		]);
	};

	return (
		<>
			{originalImageAndMask?.original && (
				<div className={'fixed flex flex-col items-center top-10 right-10 z-10 fade-in'}>
					<span>Editing</span>
					<img
						className={'border rounded-xl w-36 h-36 object-cover'}
						src={originalImageAndMask.mask ?? originalImageAndMask.original}
						alt="Original Image"
					/>
				</div>
			)}

			<div className="chat-container">
				<div className="chat-messages">
					<div className="grid grid-cols-12 gap-y-2">
						<GptMessage text="Hello, please leave a good description of what image do you wish?" />

						{messages.map((message, index) =>
							message.isGpt ? (
								<GptEditableImage
									key={index}
									text={message.text}
									imageUrl={message.info?.imageUrl!}
									onSelectedImage={(maskImage) =>
										setOriginalImageAndMask({
											original: message.info?.imageUrl!,
											mask: maskImage,
										})
									}
								/>
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
		</>
	);
};
