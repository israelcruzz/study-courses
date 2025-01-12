import { CategoriesRouter } from "@/Domains/Categories/routes";
import { ContactRouter } from "./Contacts/routes";

export const Routes = [
  ...CategoriesRouter,
  ...ContactRouter
]