import { pgTable, serial, varchar, pgEnum } from "drizzle-orm/pg-core";

export const ROLES = ["SUPERADMIN", "ADMIN"];
export const rolesEnum = pgEnum("role", Object.values(ROLES));

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }),
  password: varchar("password", { length: 500 }),
  role: rolesEnum("roles"),
});
