import { Request, Response } from "express";
import CategoriesRepository from "../Repositories/CategoriesRepository";
import { z } from "zod";

class CategoriesController {
  async findAll(request: Request, response: Response) {
    const categories = await CategoriesRepository.findAll();

    if (!categories) {
      response.status(400).json({ error: "Cateogies Not Found" })
    }

    response.status(200).json({ categories })
  }

  async create(request: Request, response: Response) {
    const payloadSchema = z.object({
      name: z.string().nonempty().min(3, "Name must be longer than 3 characters")
    })

    const verifyPayload = payloadSchema.safeParse(request.body);

    if (!verifyPayload.success) {
      response.status(400).json({ errors: verifyPayload.error.issues.map((err) => err.message) })
      throw new Error("Payload Invalid");
    }

    const { data } = verifyPayload

    const findByName = await CategoriesRepository.findByName(data.name);

    if (findByName) {
      response.status(400).json({ error: "Name Already Exists" })
    }

    const category = await CategoriesRepository.store(data)

    response.status(201).json({ category })
  }
}

export default new CategoriesController();