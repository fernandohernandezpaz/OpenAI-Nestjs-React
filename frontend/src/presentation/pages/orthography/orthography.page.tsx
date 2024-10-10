import {GtpMessage} from '../../components/chat-bubbles/gtp-message.tsx';
import {MyMessage} from '../../components/chat-bubbles/my-message.tsx';
import {TypingLoader} from '../../components/loader/typing-loader.tsx';
import {ChatInputBoxes } from '../../components/chat-input-boxes/chat-input-boxes.tsx'

export const OrthographyPage = () => {
    return (
        <>
            <div>
                <h1>Orthography</h1>
                <div className={'chat-container'}>
                    <div className={'chat-messages'}>
                        <div className={'grid grid-cols-12 gap-y-2'}>
                            <GtpMessage username={'AI'}
                                        text={'Welcome, write here your text and it\'ll helping you fixing the wrong words'}/>
                            <MyMessage username={'Fer'} text={'Hello'}/>
                            <TypingLoader className={'fade-in'}/>
                        </div>
                    </div>
                </div>
                <ChatInputBoxes onSendMessage={(message) => console.log(message)} />
            </div>
        </>
    )
}
