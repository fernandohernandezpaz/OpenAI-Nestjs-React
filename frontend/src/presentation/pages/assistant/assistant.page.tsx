import { useState, useEffect } from 'react';

import { GptMessage } from '../../components/chat-bubbles/gpt-message.tsx';
import { MyMessage } from '../../components/chat-bubbles/my-message.tsx';
import { TypingLoader } from '../../components/loader/typing-loader.tsx';
import { ChatInputBox } from '../../components/chat-input-boxes/chat-input-box.tsx';

import {createThreadUseCase, getMessageThreadUseCase } from '../../../core/use-cases';


interface Message {
    text: string;
    isGpt: boolean;
}

export const AssistantPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [threadId, setThreadId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const threadId = localStorage.getItem('threadId');

        if (threadId) {
            setThreadId(threadId);
        } else {
            createThreadUseCase()
                .then((id) => {
                    setThreadId(id)
                    localStorage.setItem('threadId', id!);
                });
        }
    }, []);

    const handlePost = async (text: string) => {
        if (!threadId) return;
        setIsLoading(true);
        setMessages((prev) => [...prev, { username: 'Assistant', text: text, isGpt: false }]);

        //TODO: UseCase
        setIsLoading(false);
        const replies = await getMessageThreadUseCase(threadId, text);

        // Todo: Añadir el mensaje de isGPT en true
        replies.forEach(({content, role}) => {
            setMessages((prev) => [
                ...prev,
                {text: content, isGpt: role === 'assistant',},
            ])
        })
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    {/* Bienvenida */}
                    <GptMessage text="Hi, dear user." />

                    {messages.map((message, index) =>
                        message.isGpt ? (
                            <GptMessage key={index} text={message.text} />
                        ) : (
                            <MyMessage key={index} text={message.text} />
                        ),
                    )}

                    {isLoading && (
                        <div className="col-start-1 col-end-12 fade-in">
                            <TypingLoader />
                        </div>
                    )}
                </div>
            </div>

            <ChatInputBox onSendMessage={handlePost} placeholder="Leave here your question about terms of Samsung" />
        </div>
    );
};
