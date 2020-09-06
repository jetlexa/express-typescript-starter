import { Router } from "express";
import spacex from "./spacex";
const router = Router();

router.use("/spacex", spacex);
export default router;
