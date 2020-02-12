declare module "node-dht-sensor" {
    export function read(type: string | undefined, pin: string | undefined): Promise<ReadResult>;

    export class ReadResult {
        temperature: number;
        humidity: number;
    }
}
