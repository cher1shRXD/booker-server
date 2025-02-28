import { DataSource } from "typeorm";
import "dotenv/config";
import {UserEntity} from "../../domain/user/entity/userEntity.js";
import {LibraryEntity} from "../../domain/library/entity/libraryEntity.js";


export const BookerDataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV !== "production",
  entities: [UserEntity, LibraryEntity],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
});
