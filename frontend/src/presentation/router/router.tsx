import {createBrowserRouter} from 'react-router-dom';
import {
    AssistantPage,
    TextToAudioPage,
    ProsConsPage,
    ProsConsStreamPage,
    OrthographyPage,
    AudioToTextPage,
    ImageGenerationPage,
    ImageTuningPage,
    TranslatePage
} from '../pages';
import {DashboardLayout} from '../layouts/dashboard.layout.tsx';

export const menuRoutes = [
    {
        to: "/assistant",
        icon: "fa-solid fa-spell-check",
        title: "Assistant",
        description: "Assistant",
        component: <AssistantPage/>
    },
    {
        to: "/audio-to-text",
        icon: "fa-solid fa-comment-dots",
        title: "Audio To Text",
        description: "Convert audio to text",
        component: <AudioToTextPage/>
    },
    {
        to: "/props-cons",
        icon: "fa-solid fa-code-compare",
        title: "Props & Cons",
        description: "Compare props and cons",
        component: <ProsConsPage/>
    },
    {
        to: "/orthography",
        icon: "fa-solid fa-spell-check",
        title: "Orthography",
        description: "Correct orthography",
        component: <OrthographyPage/>
    },
    {
        to: "/translate",
        icon: "fa-solid fa-language",
        title: "Traducir",
        description: "Textos a otros idiomas",
        component: <TranslatePage/>
    },
    {
        to: "/pros-cons-stream",
        icon: "fa-solid fa-water",
        title: "Como stream",
        description: "Con stream de mensajes",
        component: <ProsConsStreamPage/>
    },
    {
        to: "/image-generation",
        icon: "fa-solid fa-image",
        title: "Images",
        description: "Generate images",
        component: <ImageGenerationPage/>
    },
    {
        to: "/image-tuning",
        icon: "fa-solid fa-wand-magic",
        title: "Edit image",
        description: "Continuous generation",
        component: <ImageTuningPage/>
    },
    {
        to: "/text-to-audio",
        icon: "fa-solid fa-podcast",
        title: "Text to Audio",
        description: "Convert text to Audio",
        component: <TextToAudioPage/>
    },
];


export const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout/>,
        children: [
            ...menuRoutes.map(({to, component}) => ({
                path: to,
                element: component
            }))
        ]
    },
]);
