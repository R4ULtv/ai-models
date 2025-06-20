import { z } from "zod/v4";

const modalitySchema = z.enum(["text", "audio", "image", "video", "pdf"]);
const capabilitySchema = z.enum(["tools", "vision", "reasoning", "embedding"]);

export const modelSchema = z.object({
  id: z.string(),
  name: z.string(),
  provider: z.string(),
  provider_id: z.string(),
  capabilities: z.array(capabilitySchema),
  attachment: z.boolean(),
  temperature: z.boolean(),
  knowledge: z.string().optional(),
  input_modalities: z.array(modalitySchema).optional(),
  output_modalities: z.array(modalitySchema).optional(),
  cost: z.object({
    input: z.number(),
    output: z.number(),
    cache_read: z.number().optional(),
    cache_write: z.number().optional(),
  }),
  limit: z.object({
    context: z.number(),
    output: z.number(),
  }),
});

export type Model = z.infer<typeof modelSchema>;
