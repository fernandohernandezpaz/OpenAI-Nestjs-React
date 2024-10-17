import {useState} from 'react';
import {GptMessage} from '../../components/chat-bubbles/gpt-message.tsx';
import {MyMessage} from '../../components/chat-bubbles/my-message.tsx';
import {TypingLoader} from '../../components/loader/typing-loader.tsx';
import {ChatSelectBox, Option} from '../../components/chat-input-boxes/chat-select-box.tsx';
import {translateUseCase} from '../../../core/use-cases';


interface Message {
    text: string;
    isGpt: boolean;
}

export const TranslatePage = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([])
    const [options] = useState<Option[]>([
        {
            id: 'English',
            text: 'English',
        },
        {
            id: 'Spanish',
            text: 'Spanish',
        },
        {
            id: 'Russian',
            text: 'Russian',
        },
    ])


    const handlePost = async (text: string, selectedOption: string) => {
        setIsLoading(true);
        setMessages((prev) => [...prev, {text: text, isGpt: false}]);

        if (!text.length) return;
        if (!selectedOption.length) return;

        const {translateText, ok} = await translateUseCase(text, selectedOption);
        setIsLoading(false);

        if (!ok) {
            setMessages(prev => [...prev, {text: translateText, isGpt: false}]);
            return
        }

        setMessages(prev => [...prev, {text: translateText, isGpt: true, info: translateText}]);
    }

    return (
        <div className="chat-container">
            <h1>Translate Page</h1>
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    {/* Bienvenida */}
                    <GptMessage text="Enter here the text what you want to translate."/>

                    {
                        messages.map((message, index) => (
                            message.isGpt
                                ? (
                                    <GptMessage key={index} text={message.text}/>
                                )
                                : (
                                    <MyMessage key={index} text={message.text}/>
                                )

                        ))
                    }


                    {
                        isLoading && (
                            <div className="col-start-1 col-end-12 fade-in">
                                <TypingLoader/>
                            </div>
                        )
                    }


                </div>
            </div>


            <ChatSelectBox
                onSendMessage={handlePost}
                options={options}
                placeholder='Enter here the text'
            />

        </div>
    );
};
