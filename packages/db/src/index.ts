import { env } from "@mellith/env";
import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";

import * as schema from "./schema";

export const client = new SQL(env.DATABASE_URL!);
export const db = drizzle({ client, schema });
export * from "./schema";
