import { Hono } from "hono";
import { cors } from "hono/cors";
import { cache } from "hono/cache";
import { parseLimit, searchModels } from "./utils";

interface Bindings {
  STORAGE: Fetcher;
}

const CACHE_DURATION = "max-age=3600";

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", cors());

app.get(
  "/:objectName{.+\\.json}",
  cache({
    cacheName: "models-details",
    cacheControl: CACHE_DURATION,
  }),
  async (c) => {
    const objectName = c.req.param("objectName");

    if (!objectName) {
      return c.json({ error: "Missing object name" }, 400);
    }

    try {
      const registryUrl = `${new URL(c.req.url).origin}/${objectName}`;
      const objectResponse = await c.env.STORAGE.fetch(registryUrl);

      if (!objectResponse.ok) {
        return c.json({ error: "Object not found" }, 404);
      }

      return objectResponse;
    } catch (error) {
      console.error("Error retrieving object:", error);
      return c.json({ error: "Error processing request" }, 500);
    }
  },
);

app.get(
  "/search",
  cache({
    cacheName: "search-results",
    cacheControl: CACHE_DURATION,
  }),
  async (c) => {
    const { q, limit } = c.req.query();

    if (!q) {
      return c.json({ error: "Missing query parameter" }, 400);
    }

    const validLimit = parseLimit(limit);

    try {
      const searchUrl = `${new URL(c.req.url).origin}/models.json`;
      const searchResponse = await c.env.STORAGE.fetch(searchUrl);

      if (!searchResponse.ok) {
        return c.json({ error: "Search failed" }, 500);
      }

      const models: Model[] = await searchResponse.json();
      const results = searchModels(models, q, validLimit);

      return c.json(results);
    } catch (error) {
      console.error("Error searching:", error);
      return c.json({ error: "Error processing request" }, 500);
    }
  },
);

export default app;
