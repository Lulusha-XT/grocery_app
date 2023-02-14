import express from "express";
import category_router from "../../controllers/categories.controller";

const categoryRoutes: express.Router = express();

category_router(categoryRoutes);

export default categoryRoutes;
