import type { ApiResponse } from "@mellith/types";
import { Hono } from "hono";
import { cors } from "hono/cors";

const clientUrl = process.env.CLIENT_URL ?? "http://localhost:5173";

export const app = new Hono()

  .use(cors({ origin: clientUrl }))

  .get("/", (c) => {
    return c.text("Hello from the API!");
  })

  .get("/hello", async (c) => {
    const data: ApiResponse = {
      message: "Hello from the API!",
      success: true,
    };

    return c.json(data, { status: 200 });
  });

export default {
  port: Number(process.env.PORT ?? 3000),
  fetch: app.fetch,
};
