import { Request, Response } from "express";
import CategoriesRepository from "../Repositories/CategoriesRepository";

class CategoriesController {
  async findAll(request: Request, response: Response) {
    const categories = await CategoriesRepository.findAll();

    if (!categories) {
      return response.status(400).json({ error: "Cateogies Not Found" })
    }

    return response.status(200).json({ categories })
  }

  async create(request: Request, response: Response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" })
    }

    const findByName = await CategoriesRepository.findByName(name);

    if (findByName) {
      return response.status(400).json({ error: "Name Already Exists" })
    }

    const category = await CategoriesRepository.store({ name })

    return response.status(201).json({ category })
  }
}

export default new CategoriesController();