import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db/schema";
import { desc } from "drizzle-orm";

export async function GET(req: Request) {
  if (!requireAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const contacts = await db.select().from(contactsTable).orderBy(desc(contactsTable.createdAt));
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
