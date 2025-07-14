import { z, toJSONSchema } from "zod";

const modalitySchema = z.enum(["text", "audio", "image", "video", "pdf"]);
const capabilitySchema = z.enum(["tools", "vision", "reasoning", "embedding"]);

export const modelSchema = z.object({
  id: z.string().min(2),
  name: z.string().min(2),
  provider: z.string().min(2),
  provider_id: z.string().min(2),
  capabilities: z.array(capabilitySchema),
  attachment: z.boolean(),
  temperature: z.boolean(),
  knowledge: z.string().optional(),
  modalities: z.object({
    input: z.array(modalitySchema),
    output: z.array(modalitySchema),
  }),
  cost: z.object({
    input: z.number().min(0).optional(),
    output: z.number().min(0).optional(),
    cache_read: z.number().min(0).optional(),
    cache_write: z.number().min(0).optional(),
  }),
  limit: z.object({
    context: z.number().min(0),
    output: z.number().min(0),
  }),
  size: z.array(z.number().min(0)).optional(), // Size in Billions parameters
});

export type Model = z.infer<typeof modelSchema>;
export type Capability = z.infer<typeof capabilitySchema>;
export type Modality = z.infer<typeof modalitySchema>;

export const modelSchemaJSON = toJSONSchema(modelSchema);
