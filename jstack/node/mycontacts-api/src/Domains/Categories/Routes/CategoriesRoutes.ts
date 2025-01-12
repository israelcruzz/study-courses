import { Router } from "express";
import CategoriesController from "../Controllers/CategoriesController";

const router = Router();

router.get("/categories", CategoriesController.findAll);
router.post("/categories", CategoriesController.create);

export default router;