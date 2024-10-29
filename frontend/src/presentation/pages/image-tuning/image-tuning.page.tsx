import { useState } from 'react';
import { GptMessage } from '../../components/chat-bubbles/gpt-message.tsx';
import { MyMessage } from '../../components/chat-bubbles/my-message.tsx';
import { GptMessageImage } from '../../components/chat-bubbles/gpt-message-image.tsx';
import { TypingLoader } from '../../components/loader/typing-loader.tsx';
import { ChatInputBox } from '../../components/chat-input-boxes/chat-input-box.tsx';

import { imageGenerationUseCase, imageVariationUseCase } from '../../../core/use-cases';

interface Message {
	text: string;
	isGpt: boolean;
	info?: {
		imageUrl?: string;
		alt: string;
	};
}

export const ImageTuningPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [originalImageAndMask, setOriginalImageAndMask] = useState({
		original: undefined as string | undefined,
		mask: undefined as string | undefined,
	});

	const handleVariation = async () => {
		setIsLoading(true);

		const {
			ok,
			url: imageUrl,
			alt,
		} = await imageVariationUseCase(originalImageAndMask.original!);

		setIsLoading(false);

		if (!ok) return;

		setMessages((prev) => [
			...prev,
			{
				text: 'Image variation: ',
				isGpt: true,
				info: {
					imageUrl,
					alt,
				},
			},
		]);
	};

	const handlePost = async (text: string) => {
		setIsLoading(true);
		setMessages((prev) => [...prev, { text: text, isGpt: false }]);

		const { ok, url: imageUrl, alt } = await imageGenerationUseCase(text);
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
						src={originalImageAndMask.original}
						alt="Original Image"
					/>
					<button
						type={'button'}
						className={'btn-primary mt-2'}
						onClick={handleVariation}
					>
						Generate variation
					</button>
				</div>
			)}
			<div className="chat-container">
				<div className="chat-messages">
					<div className="grid grid-cols-12 gap-y-2">
						<GptMessage text="Hello, please leave a good description of what image do you wish?" />

						{messages.map((message, index) =>
							message.isGpt ? (
								<GptMessageImage
									key={index}
									text={message.text}
									imageUrl={message.info?.imageUrl!}
									alt={message.info?.imageUrl!}
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
