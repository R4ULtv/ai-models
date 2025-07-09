import { z, toJSONSchema } from "zod/v4";

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
  modalities: z.object({
    input: z.array(modalitySchema),
    output: z.array(modalitySchema),
  }),
  cost: z.object({
    input: z.number().optional(),
    output: z.number().optional(),
    cache_read: z.number().optional(),
    cache_write: z.number().optional(),
  }),
  limit: z.object({
    context: z.number(),
    output: z.number(),
  }),
  size: z.array(z.string()).optional(),
});

export type Model = z.infer<typeof modelSchema>;
export type Capability = z.infer<typeof capabilitySchema>;
export type Modality = z.infer<typeof modalitySchema>;

export const modelSchemaJSON = toJSONSchema(modelSchema);
