import { FormEvent, useState } from 'react';
import { OptionInterface as Option } from '../../../common/interfaces/option.interface';

interface ChatSelectBoxProps {
	onSendMessage: (message: string, selectedOption: string) => void;
	placeholder?: string;
	disabledCorrections?: boolean;
	options: Option[];
}

export const ChatSelectBox = ({
	disabledCorrections = false,
	onSendMessage,
	placeholder,
	options = [],
}: ChatSelectBoxProps) => {
	const [message, setMessage] = useState<string>('');
	const [selectedOption, setSelectedOption] = useState<string>('');
	const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!message.trim().length) return;
		if (!selectedOption.trim().length) return;

		onSendMessage(message, selectedOption);
		setMessage('');
	};
	return (
		<>
			<form
				action=""
				onSubmit={handleSendMessage}
				className={'flex flex-row items-center h-16 rounded-xl bg-white w-full px-4'}
			>
				<div className={'flex-grow'}>
					<div className={'flex'}>
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

						<select
							name="select"
							className={
								'w-2/5 ml-5 rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 h-10 pl-4'
							}
							value={selectedOption}
							onChange={(event) => setSelectedOption(event.target.value)}
						>
							<option value="">Select an option</option>
							{options.map(({ id, text }) => (
								<option key={id} value={id}>
									{text}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className={'ml-4'}>
					<button className={'btn-primary'}>
						<span>Send</span>
						<i className={'fa-regular fa-paper-plane'}></i>
					</button>
				</div>
			</form>
		</>
	);
};
