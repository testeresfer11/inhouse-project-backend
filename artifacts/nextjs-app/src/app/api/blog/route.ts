import { NextResponse } from "next/server";
import { db } from "@workspace/db";
import { blogPostsTable } from "@workspace/db/schema";
import { desc } from "drizzle-orm";

export const revalidate = 60;

export async function GET() {
  try {
    const posts = await db.select().from(blogPostsTable).orderBy(desc(blogPostsTable.publishedAt));
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
