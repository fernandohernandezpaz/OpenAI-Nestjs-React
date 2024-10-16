import {useState} from 'react';
import {GptMessage} from '../../components/chat-bubbles/gpt-message.tsx';
import {MyMessage} from '../../components/chat-bubbles/my-message.tsx';
import {TypingLoader} from '../../components/loader/typing-loader.tsx';
import {ChatInputBox} from '../../components/chat-input-boxes/chat-input-box.tsx';
 import { prosConsUseCase} from '../../../core/use-cases'

interface Message {
    text: string;
    isGpt: boolean;
}


export const ProsConsPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])


    const handlePost = async (text: string) => {

        setIsLoading(true);
        setMessages((prev) => [...prev, {text: text, isGpt: false, info:''}]);

        const {content, ok} = await prosConsUseCase(text);
        setIsLoading(false);
        if (!ok) {
            setMessages(prev => [...prev, {text: content, isGpt: false}]);
            return
        }

        setMessages(prev => [...prev, {text: content, isGpt: true, info:content}]);
    }


    return (
        <div className="chat-container">
            <h1>Pros & Cons</h1>
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    {/* Bienvenida */}
                    <GptMessage
                        text="You can input whatever you want to compare and it'll give you my point of views."/>

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


            <ChatInputBox
                onSendMessage={handlePost}
                placeholder='Escribe aquí lo que deseas'
            />

        </div>
    );
};
