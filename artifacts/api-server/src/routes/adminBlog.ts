import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { blogPostsTable, insertBlogPostSchema } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { adminAuth } from "../middleware/adminAuth";

const router: IRouter = Router();

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

router.post("/admin/blog", adminAuth, async (req, res) => {
  const body = req.body;
  if (!body.slug) {
    body.slug = slugify(body.title || "post");
  }
  const parsed = insertBlogPostSchema.safeParse(body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const [post] = await db.insert(blogPostsTable).values(parsed.data).returning();
  res.status(201).json({ ...post, publishedAt: post.publishedAt.toISOString() });
});

router.put("/admin/blog/:id", adminAuth, async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const body = req.body;
  const [updated] = await db.update(blogPostsTable).set(body).where(eq(blogPostsTable.id, id)).returning();
  if (!updated) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...updated, publishedAt: updated.publishedAt.toISOString() });
});

router.delete("/admin/blog/:id", adminAuth, async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const [deleted] = await db.delete(blogPostsTable).where(eq(blogPostsTable.id, id)).returning();
  if (!deleted) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ success: true });
});

export default router;
