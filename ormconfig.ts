import { DataSource } from "typeorm";
import { Book } from "./src/entities/Book";
import { Loan } from "./src/entities/Loan";
import { User } from "./src/entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Book, Loan, User],
  synchronize: true,
});
