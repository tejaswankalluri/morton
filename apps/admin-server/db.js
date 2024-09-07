import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./src/schema.js";
import postgres from "postgres";
import config from "./src/config/config.js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

function getPostgresDetails(withPool = true) {
  return {
    host: config.db.HOST,
    password: config.db.PASSWORD,
    username: config.db.USERNAME,
    database: config.db.DATABASE,
    max: withPool ? 10 : undefined,
  };
}

const queryClient = postgres(getPostgresDetails());
const migrationClient = postgres(getPostgresDetails(false));

export const db = drizzle(queryClient, { schema });

export async function dbSync() {
  console.log("Migration started");
  migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" }).finally(
    () => {
      migrationClient.end();
      console.log("Migration done");
    }
  );
}
