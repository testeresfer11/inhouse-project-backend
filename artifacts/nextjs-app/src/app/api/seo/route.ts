import { NextResponse } from "next/server";
import { db } from "@workspace/db";
import { seoSettingsTable } from "@workspace/db/schema";

export async function GET() {
  try {
    const settings = await db.select().from(seoSettingsTable);
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
