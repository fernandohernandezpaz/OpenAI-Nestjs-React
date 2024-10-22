import * as process from 'node:process';

export const generateAssetUrl = (fileName: string) => {
	return `${process.env.SERVER_URL}/openai/get-image-generated/${fileName}`;
};
