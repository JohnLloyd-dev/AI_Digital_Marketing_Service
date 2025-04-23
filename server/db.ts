import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

// Create postgres connection
const client = postgres(process.env.DATABASE_URL, { 
  max: 10,
  ssl: true,
  idle_timeout: 20
});

// Create drizzle instance with schema
export const db = drizzle(client, { schema });