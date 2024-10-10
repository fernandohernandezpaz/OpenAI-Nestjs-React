import {FormEvent, useState} from 'react';

interface ChatInputBoxProps {
    onSendMessage: (message: string) => void;
    placeholder?: string;
    disabledCorrections?: boolean;
}

export const ChatInputBox = ({disabledCorrections = false, onSendMessage, placeholder}: ChatInputBoxProps) => {
    const [message, setMessage] = useState('');
    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!message.trim().length) {
            return;
        }

        onSendMessage(message);
        setMessage('');
    };
    return (
        <>
            <form action=""
                  onSubmit={handleSendMessage}
                  className={'flex flex-row items-center h-16 rounded-xl bg-white w-full px-4'}
            >
                <div className={'flex-grow'}>
                    <div className={'relative w-full'}>
                        <input type="text" autoFocus name={'message'}
                               className={'flex border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 h-10 pl-4 w-full'}
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
                        <span>Send</span>
                        <i className={'fa-regular fa-paper-plane'}></i>
                    </button>

                </div>
            </form>
        </>
    )
}
