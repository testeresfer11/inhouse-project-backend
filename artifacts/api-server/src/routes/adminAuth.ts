import { Router, type IRouter } from "express";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "changeme-admin-secret";
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

const router: IRouter = Router();

router.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
    res.json({ token: ADMIN_SECRET });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

export default router;
