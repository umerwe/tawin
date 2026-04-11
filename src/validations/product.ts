import { z } from "zod";

export const productSchema = z.object({
  title: z.object({
    en: z.string().min(1, "English title is required"),
    ar: z.string().min(1, "Arabic title is required"),
  }),
  description: z.object({
    en: z.string().min(1, "English description is required"),
    ar: z.string().min(1, "Arabic description is required"),
  }),
  price: z
    .number({ error: "Price is required" })
    .positive("Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  remainingPieces: z
    .number({ error: "Remaining pieces is required" })
    .int("Must be a whole number")
    .min(0, "Cannot be negative"),
  isNewArrival: z.boolean(),
  colors: z.array(z.string()).min(1, "Select at least one color"),
  sizes: z.array(z.string()).min(1, "Select at least one size"),
  weights: z.array(
    z.object({
      unit: z.string().min(1, "Unit is required"),
      value: z.string().min(1, "Value is required"),
    })
  ),
  imageFiles: z
    .array(z.custom<File>((v) => v instanceof File, "Must be a file"))
    .min(1, "At least one image is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;