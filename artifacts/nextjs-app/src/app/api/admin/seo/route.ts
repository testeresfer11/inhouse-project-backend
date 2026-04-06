import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db } from "@workspace/db";
import { seoSettingsTable } from "@workspace/db/schema";

export async function GET(req: Request) {
  if (!requireAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const settings = await db.select().from(seoSettingsTable);
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
