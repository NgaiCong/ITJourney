import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: 'Missing API Key in .env.local' }, { status: 500 });
    }

    try {
        const res = await fetch('https://api.elevenlabs.io/v1/voices', {
            headers: { 'xi-api-key': apiKey },
        });

        if (!res.ok) {
            return NextResponse.json({ error: await res.text() }, { status: res.status });
        }

        const data = await res.json();
        // Return a simplified list for the user
        const voices = data.voices.map((v: any) => ({
            name: v.name,
            voice_id: v.voice_id,
            category: v.category,
            labels: v.labels,
            preview_url: v.preview_url
        }));

        return NextResponse.json({
            count: voices.length,
            instruction: "Find a Vietnamese voice below, copy its 'voice_id', and add 'ELEVENLABS_VOICE_ID=...' to your .env.local file.",
            voices
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
