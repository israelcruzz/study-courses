import { db } from "@/Core/Database";
import { FindByNameCategory, StoreCategorie } from "@/Domains/Categories/Protocols/Categories";

class CategoriesRepository {
  public async store(data: StoreCategorie) {
    const {
      name
    } = data

    const [row] = await db.any(`
      INSERT INTO categories(name)
      VALUES($1)
      RETURNING *;
    `, [name])

    return row
  }

  public async findAll() {
    const rows = await db.any('SELECT * FROM categories;')
    return rows;
  }

  public async findByName(name: FindByNameCategory) {
    const [row] = await db.any(`
      SELECT * FROM categories
      WHERE name = $1;
    `, [name]);

    return row;
  }
}

export default new CategoriesRepository();