import { CreateThreadResponseInterface } from '../../interfaces';

export const createThreadUseCase = async (): Promise<string | null>  => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sam-assistant/create-thread/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const {id} = await response.json() as CreateThreadResponseInterface;

        return id;
    } catch (error) {
        console.log(error);
        return null;
    }
}
