import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { blogPostsTable } from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/blog", async (_req, res) => {
  const posts = await db.select().from(blogPostsTable).orderBy(desc(blogPostsTable.publishedAt));
  const mapped = posts.map(p => ({
    ...p,
    publishedAt: p.publishedAt.toISOString(),
    tags: Array.isArray(p.tags) ? p.tags : [],
  }));
  res.json(mapped);
});

router.get("/blog/:slug", async (req, res) => {
  const { slug } = req.params;
  const [post] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.slug, slug));

  if (!post) {
    res.status(404).json({ error: "Blog post not found" });
    return;
  }

  res.json({
    ...post,
    publishedAt: post.publishedAt.toISOString(),
    tags: Array.isArray(post.tags) ? post.tags : [],
  });
});

export default router;
