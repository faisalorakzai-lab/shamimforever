import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import productsRouter from "./products";
import ordersRouter from "./orders";
import adminRouter from "./admin";
import categoriesRouter from "./categories";
import miscRouter from "./misc";
import cartRouter from "./cart";
import uploadRouter from "./upload";
import tokenizationRouter from "./tokenization";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(productsRouter);
router.use(ordersRouter);
router.use(adminRouter);
router.use(categoriesRouter);
router.use(uploadRouter);
router.use(tokenizationRouter);
router.use(miscRouter);
router.use(cartRouter);

export default router;
