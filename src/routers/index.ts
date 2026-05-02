import { Router } from "express";
import authRouter from "./authRouters/auth.routes";
const router = Router();

router.use('/auth',authRouter);

export default router;
