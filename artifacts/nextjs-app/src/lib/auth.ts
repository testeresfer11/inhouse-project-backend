import crypto from "crypto";

const secret = process.env.ADMIN_SECRET || "changeme-admin-secret";

export function createToken(username: string): string {
  const payload = Buffer.from(JSON.stringify({ username, iat: Date.now() })).toString("base64");
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyToken(token: string): boolean {
  try {
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return false;
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export function getTokenFromRequest(req: Request): string | null {
  const auth = req.headers.get("Authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return null;
}

export function requireAuth(req: Request): boolean {
  const token = getTokenFromRequest(req);
  if (!token) return false;
  return verifyToken(token);
}
