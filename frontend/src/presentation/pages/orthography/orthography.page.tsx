import {useState} from 'react';
import {GtpMessage} from '../../components/chat-bubbles/gtp-message.tsx';
import {MyMessage} from '../../components/chat-bubbles/my-message.tsx';
import {TypingLoader} from '../../components/loader/typing-loader.tsx';
import { ChatInputBox} from '../../components/chat-input-boxes/chat-input-box.tsx';
// import {ChatInputFileBox} from '../../components/chat-input-boxes/chat-input-file-box.tsx';
// import {ChatSelectBox} from '../../components/chat-input-boxes/chat-select-box.tsx';

interface Message {
    text: string;
    isGpt: boolean;
}

export const OrthographyPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);


    const handlePost = async (text: string) => {
        setIsLoading(true);
        setMessages(prev => [...prev, {text: text, isGpt: false}]);

        // TODO: use case
        setIsLoading(false);

        //Todo add isGTP true

    }

    return (
        <>
            <div>
                <h1>Orthography</h1>
                <div className={'chat-container'}>
                    <div className={'chat-messages'}>
                        <div className={'grid grid-cols-12 gap-y-2'}>
                            <GtpMessage
                                username={'AI'}
                                text={'Welcome, How can I help you?'}/>
                            {
                                messages.map(({text, isGpt}, index) => (
                                    isGpt
                                        ? <GtpMessage
                                            key={index}
                                            username={'AI'}
                                            text={text}/>
                                        : <MyMessage
                                            key={index}
                                            username={'Fer'} text={text}/>
                                ))
                            }
                            {
                                isLoading
                                &&
                                (
                                    <div className={'col-start-1 col-end-12 fade-in'}>
                                        <TypingLoader/>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
                <ChatInputBox
                    onSendMessage={handlePost}
                    placeholder={'Write here your message'}
                />

                {/*<ChatInputFileBox*/}
                {/*    onSendMessage={handlePost}*/}
                {/*    placeholder={'Write here your message'}*/}
                {/*/>*/}
                {/*<ChatSelectBox*/}
                {/*    options={[*/}
                {/*        {id: '1', text: 'Option 1'},*/}
                {/*        {id: '2', text: 'Option 2'},*/}
                {/*    ]}*/}
                {/*    onSendMessage={handlePost}*/}
                {/*    placeholder={'Write here your message'}*/}
                {/*/>*/}


            </div>
        </>
    )
}
