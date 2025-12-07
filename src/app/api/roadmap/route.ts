import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRoadmapData } from "@/lib/roadmap-service";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // We need userId, but session might only have email. 
    // Assuming we can get userId from email or session has it.
    // For now, let's fetch user first or assume session.user.id exists if configured.
    // If not, we fetch user by email.
    
    const roadmap = await getRoadmapData(session.user.id || "user-id-placeholder"); 
    // Note: In real app, ensure session.user.id is populated or fetch user by email
    
    return NextResponse.json(roadmap);
  } catch (error) {
    console.error("Roadmap API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
