import { zValidator } from "@hono/zod-validator";
import { insertApiarySchema, apiaries, db, updateApiarySchema } from "@mellith/db";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import z from "zod";

const idParamSchema = z.object({
  id: z.uuid(),
});

const app = new Hono()
  .get("/", async (c) => {
    const limit = Number(c.req.query("limit") ?? 50);
    const offset = Number(c.req.query("offset") ?? 0);
    const rows = await db.select().from(apiaries).limit(limit).offset(offset);
    return c.json(rows);
  })
  .get("/:id", zValidator("param", idParamSchema), async (c) => {
    const { id } = c.req.valid("param");
    const [apiary] = await db.select().from(apiaries).where(eq(apiaries.id, id));
    if (!apiary) return c.json({ error: "Not found" }, { status: 404 });
    return c.json(apiary, { status: 200 });
  })
  .post("/", zValidator("json", insertApiarySchema), async (c) => {
    const body = c.req.valid("json");
    const [apiary] = await db.insert(apiaries).values(body).returning();
    return c.json(apiary, { status: 201 });
  })
  .patch(
    "/:id",
    zValidator("param", idParamSchema),
    zValidator("json", updateApiarySchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const body = c.req.valid("json");
      if (Object.keys(body).length === 0) {
        return c.json({ error: "No fields to update" }, { status: 400 });
      }
      const [apiary] = await db.update(apiaries).set(body).where(eq(apiaries.id, id)).returning();
      if (!apiary) return c.json({ error: "Not found" }, { status: 404 });
      return c.json(apiary);
    },
  )
  .delete("/:id", zValidator("param", idParamSchema), async (c) => {
    const { id } = c.req.valid("param");
    const [apiary] = await db.delete(apiaries).where(eq(apiaries.id, id)).returning();
    if (!apiary) return c.json({ error: "Not found" }, { status: 404 });
    return c.json(apiary);
  });

export default app;
