import {useRef, useState} from 'react';
import {GptMessage} from '../../components/chat-bubbles/gpt-message.tsx';
import {MyMessage} from '../../components/chat-bubbles/my-message.tsx';
import {TypingLoader} from '../../components/loader/typing-loader.tsx';
import {ChatInputBox} from '../../components/chat-input-boxes/chat-input-box.tsx';
// import {prosConsStreamUseCase} from '../../../core/use-cases';
import {prosConsStreamGeneratorUseCase} from '../../../core/use-cases';

interface Message {
    text: string;
    isGpt: boolean;
}


export const ProsConsStreamPage = () => {

    const abortController = useRef<AbortController>(new AbortController());
    const isRunning = useRef<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])

    const handlePost = async (text: string) => {
        if (isRunning.current) {
            abortController.current?.abort();
            abortController.current = new AbortController();
        }

        setIsLoading(true);
        setMessages((prev) => [...prev, {text: text, isGpt: false, info: ''}]);

        const stream = prosConsStreamGeneratorUseCase(text, abortController.current.signal);
        setIsLoading(false);
        setMessages((messages) => [...messages, {text: '', isGpt: true}]);

        for await (const message of stream) {
            setMessages(messages => {
                const newMessages = [...messages];
                newMessages[newMessages.length - 1].text = message;
                return newMessages;
            });
        }
        isRunning.current = false;
        // const textDecoder = new TextDecoder();
        // let textResponse : string= ''
        // setMessages((messages) => [...messages, { text:textResponse, isGpt:true}]);
        // while (true) {
        //     const { value, done} = await reader.read();
        //     if (done) {
        //         break;
        //     }
        //
        //     textResponse += textDecoder.decode(value, {stream: true});
        //     setMessages(messages=> {
        //         const newMessages = [...messages];
        //        newMessages[newMessages.length - 1].text = textResponse;
        //        return newMessages;
        //     });
        // }
    }

    return (
        <div className="chat-container">
            <h1>Pros & Cons Stream</h1>
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    {/* Bienvenida */}
                    <GptMessage
                        text="What would you like to compare?"/>

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
