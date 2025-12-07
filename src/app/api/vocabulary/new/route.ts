import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getNewWords } from "@/lib/vocabulary-service";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");

    const words = await getNewWords(session.user.id || "user-id-placeholder", limit);
    return NextResponse.json(words);
  } catch (error) {
    console.error("Vocabulary New API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
