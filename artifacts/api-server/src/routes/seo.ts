import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { seoSettingsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { adminAuth } from "../middleware/adminAuth";

const router: IRouter = Router();

router.get("/seo", async (_req, res) => {
  const settings = await db.select().from(seoSettingsTable);
  res.json(settings);
});

router.get("/seo/:page", async (req, res) => {
  const { page } = req.params;
  const [setting] = await db.select().from(seoSettingsTable).where(eq(seoSettingsTable.page, page));
  if (!setting) {
    res.status(404).json({ error: "SEO settings not found for this page" });
    return;
  }
  res.json(setting);
});

router.put("/admin/seo/:page", adminAuth, async (req, res) => {
  const { page } = req.params;
  const body = { ...req.body, page, updatedAt: new Date() };
  const existing = await db.select().from(seoSettingsTable).where(eq(seoSettingsTable.page, page));
  let result;
  if (existing.length > 0) {
    const [updated] = await db.update(seoSettingsTable).set(body).where(eq(seoSettingsTable.page, page)).returning();
    result = updated;
  } else {
    const [inserted] = await db.insert(seoSettingsTable).values(body).returning();
    result = inserted;
  }
  res.json(result);
});

export default router;
