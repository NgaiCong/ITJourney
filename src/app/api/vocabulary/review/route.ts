import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { reviewWord } from "@/lib/vocabulary-service";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { vocabularyId, quality } = body;

    if (!vocabularyId || quality === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await reviewWord(
      session.user.id || "user-id-placeholder",
      vocabularyId,
      quality
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Vocabulary Review API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
