import pgPromise from "pg-promise";

const dbConfig = {
  host: "localhost",
  port: 5432,          
  database: "mycontacts",  
  user: "root",      
  password: "root"     
};

const pgp = pgPromise();
export const db = pgp(dbConfig);
