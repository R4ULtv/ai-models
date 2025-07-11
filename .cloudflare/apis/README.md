# Cloudflare Worker API (Hono)

This project is a Cloudflare Worker API built with [Hono](https://hono.dev/), a fast, lightweight web framework for the edge.

## Overview

This worker provides API endpoints for searching and retrieving model metadata (JSON files) from a static asset store, using the Hono framework for routing and middleware. It is designed to run on Cloudflare's edge network for low-latency, scalable serverless applications.

## Tech Stack
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Hono](https://hono.dev/)
- TypeScript

## Endpoints

### 1. `GET /:objectName{.+.json}`
- **Purpose:** Retrieve a specific JSON object (model details) by filename.
- **How it works:**
  - Expects a path like `/some-model.json`.
  - Fetches the file from the bound `STORAGE` asset store.
  - Returns the file contents if found, or a 404 error if not.
  - CORS headers are applied.
  - Response is cached for 1 hour (`Cache-Control: max-age=3600`).
- **Example:**
  ```sh
  curl https://<your-worker-url>/<model-id>.json
  ```

### 2. `GET /search?q=...&limit=...`
- **Purpose:** Search for models by query string.
- **How it works:**
  - Expects a `q` query parameter (search term).
  - Optional `limit` parameter (default 5, max 20).
  - Fetches the `models.json` file from the asset store.
  - Uses a scoring algorithm to rank models by relevance to the search terms.
  - Returns up to `limit` results, sorted by score.
  - CORS headers are applied.
  - Response is cached for 1 hour.
- **Example:**
  ```sh
  curl "https://<your-worker-url>/search?q=llama&limit=10"
  ```

## Search Algorithm
- **parseLimit:** Ensures the `limit` is a number between 1 and 20 (default 5).
- **splitIntoWords:** Splits strings into words using spaces, hyphens, underscores, or dots.
- **calculateScore:** Assigns a score to each model based on:
  - Direct substring matches in `id` (10 points) or `provider_id` (6 points).
  - Partial word matches in `id` (3 points) or `provider_id` (1 point).
  - All search terms must match for a model to be included.
- **searchModels:** Applies the scoring to all models and returns the top results.

## Configuration (`wrangler.jsonc`)
- **name:** `ai-models`
- **main:** `src/index.ts`
- **compatibility_date:** `2025-07-02`
- **assets:**
  - **directory:** `public` (static files/models)
  - **binding:** `STORAGE` (used in code as `c.env.STORAGE`)
  - **run_worker_first:** `true` (worker handles requests before static assets)
- **observability:** Enabled with full sampling.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (`npm install -g wrangler`)

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd <project-root>/.cloudflare/apis
   ```
2. Install dependencies:
   ```sh
   pnpm install
   # or
   npm install
   ```

### Local Development

Start the worker locally with Wrangler:
```sh
wrangler dev
```

This will start a local server at `http://localhost:8787` (default).

## Deployment

Deploy to Cloudflare Workers with:
```sh
wrangler publish
```

Make sure you are authenticated with Wrangler and have configured your `wrangler.toml` or `wrangler.jsonc` file.

## Project Structure

```
.cloudflare/apis/
  ├── public/        # Static assets (models.json, <model>.json, etc.)
  ├── scripts/       # Utility scripts
  ├── src/
  │   ├── index.ts   # Hono app, routes, handlers
  │   └── utils.ts   # Search and scoring logic
  ├── package.json   # Project dependencies and scripts
  ├── wrangler.jsonc # Worker configuration
  └── README.md      # This file
```

## License

See [LICENSE](../../LICENSE) for details.
