// generateSchema.ts
import { z } from "zod"
import { inputConfig } from "./inputConfig"

export const generateSchema = () => {
  const shape = inputConfig.reduce((acc, field) => {
    acc[field.name] = field.validation
    return acc
  }, {} as Record<string, z.ZodTypeAny>)

  return z.object(shape)
}
