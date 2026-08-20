import { hcWithType } from "@mellith/server/client";

export const client = hcWithType(import.meta.env.VITE_SERVER_URL);
