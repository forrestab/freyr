import { readFile } from "fs";

export function readFileAsync(path: string): Promise<Buffer> {
    return new Promise((resolve: (value?: Buffer) => void, reject: (reason?: any) => void) => {
        readFile(path, (error: NodeJS.ErrnoException | null, data: Buffer): void => {
            if (error) {
                reject(error);
            }

            resolve(data);
        });
    });
}
