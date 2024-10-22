import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';
import {InternalServerErrorException} from "@nestjs/common";

export const downloaderFile = async (url: string): Promise<string> => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new InternalServerErrorException('Download the image was not possible');
    }

    const folderPath = path.resolve('./', './generated/images');
    fs.mkdirSync(folderPath, { recursive: true });

    const imageName = `${new Date().getTime()}.png`;
    const buffer = Buffer.from(await response.arrayBuffer());

    const filePath = `${folderPath}/${imageName}`;
    fs.writeFileSync(filePath, buffer);

    await sharp(buffer)
        .png()
        .ensureAlpha()
        .toFile(filePath);

    return imageName;
}


export const downloadBase64ImageAsPng = async (base64Image: string): Promise<string> => {
    base64Image = base64Image.split(';base64,').pop();
    const imageBuffer = Buffer.from(base64Image, 'base64');
    const folderPath = path.resolve('./', './generated/images/');
    fs.mkdirSync(folderPath, { recursive: true });
    const imageNamePng = `${new Date().getTime()}-64.png`;
    const filePath = `${folderPath}/${imageNamePng}`;
    await sharp(imageBuffer)
        .png()
        .ensureAlpha()
        .toFile(filePath);
    return imageNamePng;
}
