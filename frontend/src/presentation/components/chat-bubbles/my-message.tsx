import Markdown from 'react-markdown';

interface GtpMessageProps {
    username?: string;
    text: string;
}

export const MyMessage = ({username, text}: GtpMessageProps) => {
    return (
        <div className={'col-start-6 col-end-13 p-3 rounded-lg'}>
            <div className={'flex items-center justify-start flex-row-reverse'}>
                <div className={'flex items-center justify-center h-10 w-10 rounded-full bg-red-600 flex-shrink-0'}>
                    {username ?? 'Use'}
                </div>
                <div className={'relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl'}>
                    <Markdown>{text}</Markdown>
                </div>
            </div>
        </div>
    )
}
