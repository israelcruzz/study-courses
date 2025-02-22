import express, { Request, Response } from "express";
import pgPromise from "pg-promise";

type DatabaseConfig = {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
}

const dbConfig: DatabaseConfig = {
    host: "db",
    port: 5432,
    database: "challenge",
    user: "root",
    password: "root"
}

const pgp = pgPromise();

const clientDB = pgp(dbConfig);

const app = express();

app.get("/customer", async (httpRequest: Request, httpResponse: Response) => {
    let rows = await clientDB.any(`
        SELECT name, email 
        FROM customers
        WHERE id = $1;
    `, [1])

    if (rows.length === 0) {
        return httpResponse.status(404).send(`<h1>Usuário não encontrado!</h1>`);
    }

    const row = rows[0];

    httpResponse.send(`
        <h1>Usuário Encontrado:</h1>
        <p>Name: ${row.email}</p> 
        <p>Email: ${row.email}</p>    
    `)
});

app.listen(4000,
    () => console.log(`🔥 Running in port 4000 🔥`)
)