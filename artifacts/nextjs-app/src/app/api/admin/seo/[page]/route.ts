import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db } from "@workspace/db";
import { seoSettingsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request, { params }: { params: Promise<{ page: string }> }) {
  if (!requireAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { page } = await params;
  try {
    const [setting] = await db.select().from(seoSettingsTable).where(eq(seoSettingsTable.page, page));
    if (!setting) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(setting);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ page: string }> }) {
  if (!requireAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { page } = await params;
  try {
    const body = await req.json();
    const existing = await db.select().from(seoSettingsTable).where(eq(seoSettingsTable.page, page));
    let result;
    const fields = {
      title: body.title ?? "",
      description: body.description ?? "",
      keywords: body.keywords ?? "",
      ogTitle: body.ogTitle ?? "",
      ogDescription: body.ogDescription ?? "",
      ogImage: body.ogImage ?? "",
      canonicalUrl: body.canonicalUrl ?? "",
      structuredData: body.structuredData ?? "",
      robotsIndex: body.robotsIndex ?? "index",
      robotsFollow: body.robotsFollow ?? "follow",
      twitterCard: body.twitterCard ?? "summary_large_image",
      twitterSite: body.twitterSite ?? "",
    };
    if (existing.length > 0) {
      const [updated] = await db.update(seoSettingsTable)
        .set({ ...fields, updatedAt: new Date() })
        .where(eq(seoSettingsTable.page, page))
        .returning();
      result = updated;
    } else {
      const [inserted] = await db.insert(seoSettingsTable)
        .values({ page, ...fields })
        .returning();
      result = inserted;
    }
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to update" }, { status: 400 });
  }
}
