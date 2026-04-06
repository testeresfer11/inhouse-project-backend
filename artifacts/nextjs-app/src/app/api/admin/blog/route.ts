import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db } from "@workspace/db";
import { blogPostsTable } from "@workspace/db/schema";
import { desc } from "drizzle-orm";

export async function GET(req: Request) {
  if (!requireAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const posts = await db.select().from(blogPostsTable).orderBy(desc(blogPostsTable.publishedAt));
    return NextResponse.json(posts);
  } catch (e) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!requireAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const [post] = await db.insert(blogPostsTable).values({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || "",
      content: body.content || "",
      category: body.category || "General",
      author: body.author || "Admin",
      authorRole: body.authorRole || "",
      readTime: body.readTime || 5,
      imageUrl: body.imageUrl || null,
      tags: body.tags || [],
    }).returning();
    return NextResponse.json(post, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to create post" }, { status: 400 });
  }
}
