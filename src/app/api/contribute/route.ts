import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, topic, description } = body;

        const dataDir = path.join(process.cwd(), 'src', 'data');
        const filePath = path.join(dataDir, 'contributions.json');

        // Ensure directory exists
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Read existing data
        let contributions = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            try {
                contributions = JSON.parse(fileContent);
            } catch (e) {
                // If file is corrupted or empty, start fresh
                contributions = [];
            }
        }

        // Add new contribution
        const newContribution = {
            id: Date.now().toString(),
            email,
            topic,
            description,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };

        contributions.push(newContribution);

        // Write back to file
        fs.writeFileSync(filePath, JSON.stringify(contributions, null, 2));

        return NextResponse.json({ success: true, message: 'Contribution saved', data: newContribution });
    } catch (error) {
        console.error('Error saving contribution:', error);
        return NextResponse.json({ success: false, message: 'Failed to save contribution' }, { status: 500 });
    }
}
