import { NextResponse } from "next/server";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const [contact] = await db.insert(contactsTable).values({
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      company: body.company || null,
      service: body.service || "General Enquiry",
      message: body.message,
      website: body.website || null,
    }).returning();
    return NextResponse.json(contact, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to submit" }, { status: 400 });
  }
}
