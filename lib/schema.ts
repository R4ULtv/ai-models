import { z, toJSONSchema } from "zod";

const modalitySchema = z.enum(["text", "audio", "image", "video", "pdf"]);
const capabilitySchema = z.enum(["tools", "vision", "reasoning", "embedding"]);

export const modelSchema = z.object({
  id: z
    .string()
    .min(2, "ID must be at least 2 characters")
    .max(100, "ID must not exceed 100 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "ID can only contain letters, numbers, hyphens, and underscores",
    ),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(200, "Name must not exceed 200 characters")
    .trim(),
  provider: z
    .string()
    .min(2, "Provider must be at least 2 characters")
    .max(100, "Provider must not exceed 100 characters")
    .trim(),
  provider_id: z
    .string()
    .min(2, "Provider ID must be at least 2 characters")
    .max(100, "Provider ID must not exceed 100 characters")
    .trim(),
  capabilities: z.array(capabilitySchema),
  attachment: z.boolean(),
  temperature: z.boolean(),
  knowledge: z
    .string()
    .refine((val) => /^\d{4}-\d{2}-\d{2}$|^\d{4}-\d{2}$/.test(val), {
      message: "Knowledge date must be in YYYY-MM-DD or YYYY-MM format",
    })
    .optional(),
  modalities: z.object({
    input: z
      .array(modalitySchema)
      .min(1, "At least one input modality must be specified"),
    output: z
      .array(modalitySchema)
      .min(1, "At least one output modality must be specified"),
  }),
  cost: z.object({
    input: z.number().min(0, "Input cost cannot be negative").optional(),
    output: z.number().min(0, "Output cost cannot be negative").optional(),
    cache_read: z
      .number()
      .min(0, "Cache read cost cannot be negative")
      .optional(),
    cache_write: z
      .number()
      .min(0, "Cache write cost cannot be negative")
      .optional(),
  }),
  limit: z.object({
    context: z.number().min(1, "Context limit must be at least 1"),
    output: z.number().min(1, "Output limit must be at least 1"),
  }),
  size: z.array(z.number().min(0, "Size parameters cannot be negative")), // Size in Billions parameters
});

export type Model = z.infer<typeof modelSchema>;
export type Capability = z.infer<typeof capabilitySchema>;
export type Modality = z.infer<typeof modalitySchema>;

export const modelSchemaJSON = toJSONSchema(modelSchema);
