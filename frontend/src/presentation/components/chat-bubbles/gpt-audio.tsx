import Markdown from 'react-markdown';

interface GtpMessageProps {
	username?: string;
	text: string;
	audioUrl: string;
}

export const GptAudioMessage = ({ username, text, audioUrl }: GtpMessageProps) => {
	return (
		<div className={'col-start-1 col-end-8 p-3 rounded-lg'}>
			<div className={'flex flex-row items-start'}>
				<div
					className={
						'flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink'
					}
				>
					{username ?? 'AI'}
				</div>
				<div
					className={
						'relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl'
					}
				>
					<Markdown>{text}</Markdown>
					<audio src={audioUrl} controls className={'w-full'}></audio>
				</div>
			</div>
		</div>
	);
};
