import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";

import apiary from "./routes/apiary";

const clientUrl = process.env.CLIENT_URL ?? "http://localhost:5173";

export const app = new Hono()

  .use(cors({ origin: clientUrl }))
  .route("/apiary", apiary)
  .onError((err, c) => {
    if (err instanceof HTTPException) {
      return err.getResponse();
    }
    console.error(err);
    return c.text("Internal Server Error", 500);
  });

export default {
  port: Number(process.env.PORT ?? 3000),
  fetch: app.fetch,
};
