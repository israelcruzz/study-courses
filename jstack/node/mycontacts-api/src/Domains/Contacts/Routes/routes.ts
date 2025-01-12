import { Router } from "express";
import CategoriesController from "@/Domains/Contacts/Controllers/ContactsController";

const router = Router();

router.get("/contacts", CategoriesController.findAll);
router.get("/contacts/:id", CategoriesController.index);
router.post("/contacts", CategoriesController.create);
router.delete("/contacts/:id", CategoriesController.delete);
router.put("/contacts/:id", CategoriesController.update);

export default router;