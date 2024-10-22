import * as path from 'path';
import * as fs from 'fs';
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

    return filePath;
}
