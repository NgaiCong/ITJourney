import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1/text-to-speech';
// "Rachel" is a good default, but for Vietnamese we might want a specific one.
// However, ElevenLabs Multilingual v2 model adapts to the language.
// Let's use "Rachel" or a deeply expressive voice. 
// "21m00Tcm4TlvDq8ikWAM" (Rachel) is standard.
// "EXAVITQu4vr4xnSDxMaL" (Bella) is soft.
// Default to a known ID, but allow override.
// User should set ELEVENLABS_VOICE_ID in .env.local
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';

export class ElevenLabsTTS {

    static async generate(text: string): Promise<Buffer | null> {
        const apiKey = process.env.ELEVENLABS_API_KEY;
        if (!apiKey) return null;

        // 1. Check Cache
        const hash = crypto.createHash('md5').update(text).digest('hex');
        const cacheDir = path.join(process.cwd(), 'public', 'audio-cache');
        const filePath = path.join(cacheDir, `${hash}.mp3`);

        if (fs.existsSync(filePath)) {
            console.log(`[ElevenLabs] Cache Hit: ${hash}`);
            return fs.readFileSync(filePath);
        }

        // 2. Call API with Retry Logic
        const maxRetries = 3;
        let attempt = 0;
        let delay = 1000; // Start with 1s

        while (attempt < maxRetries) {
            try {
                console.log(`[ElevenLabs] Generating (${attempt + 1}/${maxRetries}): ${text.substring(0, 20)}...`);

                const response = await fetch(`${ELEVENLABS_API_URL}/${VOICE_ID}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'audio/mpeg',
                        'Content-Type': 'application/json',
                        'xi-api-key': apiKey,
                    },
                    body: JSON.stringify({
                        text: text,
                        model_id: "eleven_multilingual_v2", // Best for Vietnamese
                        voice_settings: {
                            stability: 0.5,
                            similarity_boost: 0.75,
                        }
                    }),
                });

                if (response.status === 429) {
                    console.warn(`[ElevenLabs] Rate Limited (429). Retrying in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2; // Exponential backoff
                    attempt++;
                    continue;
                }

                if (!response.ok) {
                    const errorText = await response.text();
                    console.warn(`[ElevenLabs] API Error: ${response.status} - ${errorText}`);
                    return null; // Fatal error, fallback
                }

                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                // 3. Save to Cache
                if (!fs.existsSync(cacheDir)) {
                    fs.mkdirSync(cacheDir, { recursive: true });
                }
                fs.writeFileSync(filePath, buffer);
                console.log(`[ElevenLabs] Saved to Cache: ${filePath}`);

                return buffer;

            } catch (error) {
                console.error("[ElevenLabs] Exception:", error);
                return null;
            }
        }

        console.warn("[ElevenLabs] Max retries exceeded.");
        return null;
    }
}
