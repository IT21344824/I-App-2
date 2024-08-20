// inputConfig.ts
import { z } from "zod"

export const inputConfig = [
  {
    name: "Name",
    label: "Name",
    placeholder: "Enter Name",
    type: "text",
    validation: z.string().min(2, {
      message: "Item name must be at least 2 characters.",
    }),
  },
  {
    name: "Views",
    label: "Views",
    placeholder: "Enter Views",
    type: "number",
    validation: z.preprocess((val) => Number(val), z.number().min(1, {
      message: "Views must be at least 1.",
    })),
  },
  {
    name: "Description",
    label: "Description",
    placeholder: "Enter Description",
    type: "text",
    validation: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
  },
  // {
  //   name: "age",
  //   label: "Age",
  //   placeholder: "Enter your age",
  //   type: "number",
  //   validation: z.number().min(1, {
  //     message: "Age must be at least 1.",
  //   }).optional(),
  // },
  // Add more fields as needed
]
