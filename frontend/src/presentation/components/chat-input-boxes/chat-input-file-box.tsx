import { FormEvent, useState, useRef } from 'react';

interface ChatInputFileBoxProps {
	onSendMessage: (message: string) => void;
	placeholder?: string;
	disabledCorrections?: boolean;
	accept?: string;
}

export const ChatInputFileBox = ({
	disabledCorrections = false,
	onSendMessage,
	placeholder,
	accept = 'image/*',
}: ChatInputFileBoxProps) => {
	const [message, setMessage] = useState('');
	const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null);
	const inputFileRef = useRef<HTMLInputElement>(null);
	const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!message.trim().length) return;

		onSendMessage(message);
		setMessage('');
	};
	return (
		<>
			<form
				action=""
				onSubmit={handleSendMessage}
				className={'flex flex-row items-center h-16 rounded-xl bg-white w-full px-4'}
			>
				<div className="mr-3">
					<button
						type="button"
						className={
							'flex items-center justify-center text-gray-400 hover:text-gray-600'
						}
						onClick={() => inputFileRef.current?.click()}
					>
						<i className={'fa-solid fa-paperclip text-xl'}></i>
					</button>
					<input
						type="file"
						hidden
						ref={inputFileRef}
						accept={accept}
						onChange={(event) => setSelectedFile(event.target?.files?.item(0))}
					/>
				</div>
				<div className={'flex-grow'}>
					<div className={'relative w-full'}>
						<input
							type="text"
							autoFocus
							name={'message'}
							className={
								'flex border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 h-10 pl-4 w-full'
							}
							placeholder={placeholder}
							autoComplete={disabledCorrections ? 'on' : 'off'}
							autoCorrect={disabledCorrections ? 'on' : 'off'}
							spellCheck={disabledCorrections ? 'true' : 'false'}
							value={message}
							onChange={(event) => setMessage(event.target.value)}
						/>
					</div>
				</div>
				<div className={'ml-4'}>
					<button className={'btn-primary'}>
						{!selectedFile ? (
							<span className={'mr-2'}>Send</span>
						) : (
							<span className={'mr-2'}>{selectedFile.name.substring(0, 10)}...</span>
						)}
						<i className={'fa-regular fa-paper-plane'}></i>
					</button>
				</div>
			</form>
		</>
	);
};
