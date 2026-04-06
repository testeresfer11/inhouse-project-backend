import { Request, Response, NextFunction } from "express";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "changeme-admin-secret";

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = authHeader.slice(7);
  if (token !== ADMIN_SECRET) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  next();
}
