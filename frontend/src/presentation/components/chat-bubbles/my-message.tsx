import Markdown from 'react-markdown';
import AudioFileIcon from '../../../assets/svg/audio-file.svg';

interface GtpMessageProps {
	username?: string;
	text: string;
	showIcon?: boolean;
	iconName?: string;
}

export const MyMessage = ({ username, text, showIcon, iconName }: GtpMessageProps) => {
	return (
		<div className={'col-start-6 col-end-13 p-3 rounded-lg'}>
			<div className={'flex items-center justify-start flex-row-reverse'}>
				<div
					className={
						'flex items-center justify-center h-10 w-10 rounded-full bg-red-600 flex-shrink-0'
					}
				>
					{username ?? 'Use'}
				</div>
				<div
					className={
						'relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl'
					}
				>
					<Markdown>{text}</Markdown>
					{showIcon ? (
						<div className={'flex items-center justify-center'}>
							<img src={AudioFileIcon} height={32} width={32} alt={iconName} />
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};
