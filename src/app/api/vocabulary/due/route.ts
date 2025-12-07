import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDueWords } from "@/lib/vocabulary-service";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const words = await getDueWords(session.user.id || "user-id-placeholder");
    return NextResponse.json(words);
  } catch (error) {
    console.error("Vocabulary Due API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
