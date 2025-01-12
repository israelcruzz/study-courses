import { Request, Response } from "express";
import ContactsRepository from "../Repositories/ContactsRepository";
import { Order } from "../Protocols/Contacts";
import { z } from "zod";

class ContactsController {
  async index(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) {
      throw new Error("Id in params is required");
    }

    const contact = await ContactsRepository.index(id);

    if (!contact) {
      response.status(400).json({ error: "Contact Not Found" });
    }

    response.status(200).json(contact);
  }

  async findAll(request: Request, response: Response) {
    const { orderBy } = request.query;

    const contacts = await ContactsRepository.findAll(orderBy as Order);

    if (!contacts) {
      response.status(400).json({ error: "Contacts Not Found" });
    }

    response.status(200).json(contacts);
  }

  async create(request: Request, response: Response) {
    const payloadSchema = z.object({
      name: z.string().nonempty().min(3, "Name must be longer than 3 characters"),
      email: z.string().email().nonempty(),
      phone: z.string().nonempty(),
      category_id: z.string().uuid().nonempty()
    })

    const verifyPayload = payloadSchema.safeParse(request.body);

    if (!verifyPayload.success) {
      response.status(400).json({ error: verifyPayload.error.issues.map((err) => err.message) });
      throw new Error("Payload Invalid");
    }

    const { data } = verifyPayload;

    const contactExists = await ContactsRepository.findByEmail(data.email);

    if (contactExists) {
      response.status(400).json({ error: "Contact Already Exists" });
    }

    const contact = await ContactsRepository.create(data);

    response.status(201).json(contact);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) {
      throw new Error("Id in params is required");
    }

    await ContactsRepository.delete(id);

    response.status(200).json({ message: "Contact Deleted" });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) {
      throw new Error("Id in params is required");
    }

    const payloadSchema = z.object({
      name: z.string().nonempty().min(3, "Name must be longer than 3 characters"),
      email: z.string().email().nonempty(),
      phone: z.string().nonempty(),
      category_id: z.string().uuid().nonempty()
    })

    const verifyPayload = payloadSchema.safeParse(request.body);

    if (!verifyPayload.success) {
      response.status(400).json({ error: verifyPayload.error.issues.map((err) => err.message) });
      throw new Error("Payload Invalid");
    }

    const { data } = verifyPayload;

    const contactNotExists = await ContactsRepository.findById(id);

    if (!contactNotExists) {
      response.status(400).json({ error: "Contact Not Exists" });
    }

    const contactUpdated = await ContactsRepository.update(id, data);

    response.status(201).json(contactUpdated);
  }
}

export default new ContactsController();
