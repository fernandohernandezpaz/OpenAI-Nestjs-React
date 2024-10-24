import {useRef, useEffect, useState, MouseEvent} from 'react';

interface GptEditableImageProps {
    text: string;
    imageUrl: string;
    onSelectedImage?: (imageUrl:string) => void;
}

export const GptEditableImage = ({imageUrl, onSelectedImage}: GptEditableImageProps) => {
    const originalImageRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [coords, setCoords] = useState<Record<string, number>>({
        x: 0, y: 0,
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');


        const image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = imageUrl;

        // @ts-ignore
        originalImageRef.current = image;
        image.onload = () => {
            ctx?.drawImage(image, 0, 0, canvas?.width || 1024, canvas?.height || 1024);
        }

    }, []);

    const onMouseDown = (
        event: MouseEvent
    ) => {
        setIsDrawing(true);
        const boundingClientRect = canvasRef.current!.getBoundingClientRect();
        const startX = event.clientX - boundingClientRect.left;
        const startY = event.clientY - boundingClientRect.top;

        setCoords({x: startX, y: startY});
    };

    const onMouseUp = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current!;
        const url = canvas.toDataURL('image/png');
        // https://jaredwinick.github.io/base64-image-viewer/
        onSelectedImage && onSelectedImage(url);
    };

    const onMouseMove = (
        event: MouseEvent
    ) => {
        if (!isDrawing) return;
        const boundingClientRect = canvasRef.current!.getBoundingClientRect();
        const currentX = event.clientX - boundingClientRect.left;
        const currentY = event.clientY - boundingClientRect.top;

        const width = currentX - coords.x;
        const height = currentY - coords.y;

        const canvasWidth = canvasRef.current!.width;
        const canvasHeight = canvasRef.current!.height;

        const ctx = canvasRef.current!.getContext("2d")!;

        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        ctx.drawImage(originalImageRef.current!, 0, 0, canvasWidth, canvasHeight);

        ctx. fillRect(coords.x, coords.y, width, height);
        // ctx.clearRect(coords.x, coords.y, width, height);
    };

    const resetCanvas = () => {
        const ctx = canvasRef.current!.getContext("2d")!;
        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        ctx.drawImage(
            originalImageRef.current!,
            0,
            0,
            canvasRef.current!.width,
            canvasRef.current!.height
        );

        onSelectedImage && onSelectedImage(imageUrl);
    };

    return (
        <div className={'col-start-1 col-end-8 p-3 rounded-lg'}>
            <div className={'flex flex-row items-start'}>
                <div
                    className={
                        'flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink'
                    }
                >
                    {'AI'}
                </div>
                <div
                    className={
                        'relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl'
                    }
                >
                    <canvas
                        ref={canvasRef}
                        width={1024}
                        height={1024}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                        onMouseMove={onMouseMove}
                    >

                    </canvas>
                    <button
                        type="button"
                        onClick={resetCanvas}
                        className={'btn-primary mt-2'}
                    >
                        Erase selection
                    </button>
                </div>
            </div>
        </div>
    );
};
