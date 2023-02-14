import express, { Router } from "express";
import categoryRoutes from "./api/app.routes";

const router: express.Router = express();

router.use("/category", categoryRoutes);

export default router;
