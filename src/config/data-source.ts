import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { join } from "path";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DATABASE!,
  logging: false,
  synchronize: false,
  entities: [join(__dirname, "../entity/*.entity.{ts, js}")],
  migrations: [join(__dirname, "../migration/*.{ts, js}")],
  subscribers: [],
});
