import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db/schema";
import { SubmitContactBody, ListContactsResponseItem } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    return;
  }

  const { name, email, company, phone, service, message, website } = parsed.data;

  const [contact] = await db.insert(contactsTable).values({
    name,
    email,
    company: company ?? null,
    phone: phone ?? null,
    service,
    message,
    website: website ?? null,
  }).returning();

  const validated = ListContactsResponseItem.parse({
    ...contact,
    createdAt: contact.createdAt.toISOString(),
    company: contact.company ?? undefined,
    phone: contact.phone ?? undefined,
    website: contact.website ?? undefined,
  });

  res.status(201).json(validated);
});

router.get("/contact", async (_req, res) => {
  const contacts = await db.select().from(contactsTable).orderBy(desc(contactsTable.createdAt));
  const mapped = contacts.map(c => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    company: c.company ?? undefined,
    phone: c.phone ?? undefined,
    website: c.website ?? undefined,
  }));
  res.json(mapped);
});

export default router;
