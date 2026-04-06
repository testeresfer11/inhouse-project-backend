import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import blogRouter from "./blog";
import adminBlogRouter from "./adminBlog";
import adminAuthRouter from "./adminAuth";
import seoRouter from "./seo";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(blogRouter);
router.use(adminBlogRouter);
router.use(adminAuthRouter);
router.use(seoRouter);

export default router;
