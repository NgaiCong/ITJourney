import { WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';

interface EdgeTTSOptions {
    text: string;
    voice?: string;
    rate?: string; // e.g. "+0%", "+10%"
    pitch?: string; // e.g. "+0Hz"
}

export class EdgeTTS {
    private static TRUSTED_CLIENT_TOKEN = '6A5AA1D4EAFF4E9FB37E23D68491D6F4';
    private static WSS_URL = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${EdgeTTS.TRUSTED_CLIENT_TOKEN}`;

    static async generate(options: EdgeTTSOptions): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const ws = new WebSocket(EdgeTTS.WSS_URL);
            const audioChunks: Buffer[] = [];
            const requestId = uuidv4().replace(/-/g, '');

            ws.on('open', () => {
                // 1. Send Speech Config
                const config = {
                    context: {
                        synthesis: {
                            audio: {
                                metadataoptions: {
                                    sentenceBoundaryEnabled: 'false',
                                    wordBoundaryEnabled: 'false',
                                },
                                outputFormat: 'audio-24khz-48kbitrate-mono-mp3',
                            },
                        },
                    },
                };

                const configMessage =
                    `X-Timestamp:${new Date().toString()}\r\n` +
                    `Content-Type:application/json; charset=utf-8\r\n` +
                    `Path:speech.config\r\n\r\n` +
                    JSON.stringify(config);

                ws.send(configMessage);

                // 2. Send SSML
                const voice = options.voice || 'vi-VN-HoaiMyNeural';
                const rate = options.rate || '+0%';
                const pitch = options.pitch || '+0Hz';

                const ssml =
                    `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='vi-VN'>` +
                    `<voice name='${voice}'>` +
                    `<prosody rate='${rate}' pitch='${pitch}'>${options.text}</prosody>` +
                    `</voice></speak>`;

                const ssmlMessage =
                    `X-RequestId:${requestId}\r\n` +
                    `Content-Type:application/ssml+xml\r\n` +
                    `X-Timestamp:${new Date().toString()}\r\n` +
                    `Path:ssml\r\n\r\n` +
                    ssml;

                ws.send(ssmlMessage);
            });

            ws.on('message', (data: any, isBinary: boolean) => {
                if (isBinary) {
                    const buffer = data as Buffer;
                    const headerLength = buffer.readUInt16BE(0);
                    const header = buffer.subarray(2, 2 + headerLength).toString();

                    if (header.includes('Path:audio')) {
                        // Audio data starts after header
                        const audioData = buffer.subarray(2 + headerLength);
                        audioChunks.push(audioData);
                    } else if (header.includes('Path:turn.end')) {
                        // End of stream
                        ws.close();
                        resolve(Buffer.concat(audioChunks));
                    }
                }
            });

            ws.on('error', (error: any) => {
                reject(error);
            });

            ws.on('close', () => {
                if (audioChunks.length > 0) {
                    resolve(Buffer.concat(audioChunks));
                } else {
                    reject(new Error('No audio received'));
                }
            });
        });
    }
}
