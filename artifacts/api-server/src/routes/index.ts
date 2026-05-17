import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import categoriesRouter from "./categories";
import authRouter from "./auth";
import ordersRouter from "./orders";
import cartRouter from "./cart";
import adminRouter from "./admin";
import miscRouter from "./misc";
import uploadRouter from "./upload";

const router: IRouter = Router();

router.use(healthRouter);
router.use(productsRouter);
router.use(categoriesRouter);
router.use(authRouter);
router.use(ordersRouter);
router.use(cartRouter);
router.use(adminRouter);
router.use(uploadRouter);
router.use(miscRouter);

export default router;
