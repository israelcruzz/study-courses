import { db } from "@/Core/Database";
import { ContactPayload, Order } from "../Protocols/Contacts";

class ContactsRepository {
  async index(id: string) {
    const [row] = await db.any("SELECT * FROM contacts WHERE id = $1", [id]);
    return row;
  }

  async findAll(order: Order = "ASC") {
    const rows = await db.any(`
        SELECT contacts.*, categories.name AS category_name FROM contacts
        LEFT JOIN categories ON
        contacts.category_id = categories.id
        ORDER BY contacts.name ${order};
    `);

    return rows;
  }

  async create(data: ContactPayload) {
    const { name, email, phone, category_id } = data;

    const [row] = await db.any(
      `
        INSERT INTO contacts(name, email, phone, category_id)
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `,
      [name, email, phone, category_id]
    );

    return row;
  }

  async delete(id: string) {
    const deleteContact = await db.any("DELETE FROM contacts WHERE id = $1;", [
      id,
    ]);
    return deleteContact;
  }

  async findByEmail(email: string) {
    const [row] = await db.any("SELECT * FROM contacts WHERE email = $1;", [
      email,
    ]);

    return row;
  }

  async findById(id: string) {
    const [row] = await db.any("SELECT * FROM contacts WHERE id = $1;", [id])
    return row
  }

  async update(id: string, data: ContactPayload) {
    const { name, category_id, email, phone } = data;

    const [row] = await db.any(
      `
        UPDATE contacts 
        SET name = $1, email = $2, phone = $3, category_id = $4
        WHERE id = $5
        RETURNING *;
      `,
      [name, email, phone, category_id, id]
    );

    return row;
  }
}

export default new ContactsRepository();
