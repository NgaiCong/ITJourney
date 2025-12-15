
import { EdgeTTS } from '@/lib/edge-tts';
import { ElevenLabsTTS } from '@/lib/elevenlabs';
import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { getAudioUrl } from 'google-tts-api';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-proj-dummy',
});

export async function POST(req: NextRequest) {
    try {
        const { text } = await req.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }


        if (process.env.ELEVENLABS_API_KEY) {
            const elevenBuffer = await ElevenLabsTTS.generate(text);
            if (elevenBuffer) {
                return new NextResponse(elevenBuffer as any, {
                    headers: { 'Content-Type': 'audio/mpeg' },
                });
            }

        }


        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) {
            try {
                const mp3 = await openai.audio.speech.create({
                    model: "tts-1",
                    voice: "shimmer",
                    input: text,
                });
                const buffer = Buffer.from(await mp3.arrayBuffer());
                return new NextResponse(buffer, {
                    headers: { 'Content-Type': 'audio/mpeg' },
                });
            } catch (openaiError: any) {
                console.warn("OpenAI Failed, switching to Edge TTS:", openaiError.message);
            }
        }


        try {
            const edgeBuffer = await EdgeTTS.generate({
                text,
                voice: 'vi-VN-HoaiMyNeural',
                rate: '+10%',
            });

            return new NextResponse(edgeBuffer as any, {
                headers: { 'Content-Type': 'audio/mpeg' },
            });
        } catch (edgeError) {
            console.warn("Edge TTS Failed, switching to Google TTS:", edgeError);
        }


        const googleUrl = getAudioUrl(text, {
            lang: 'vi',
            slow: false,
            host: 'https://translate.google.com',
        });

        const googleRes = await fetch(googleUrl);
        const googleBuffer = Buffer.from(await googleRes.arrayBuffer());

        return new NextResponse(googleBuffer, {
            headers: { 'Content-Type': 'audio/mpeg' },
        });

    } catch (error: any) {
        console.error('TTS Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
