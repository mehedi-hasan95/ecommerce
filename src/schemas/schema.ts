import * as z from "zod";

export const CategorySchema = z.object({
  name: z.string().min(2, {
    message: "Name is required",
  }),
  img: z
    .string({ message: "Image is reqired" })
    .min(1, { message: "Add an Image" }),
  color: z
    .string()
    .min(3, {
      message: "hex color sould be at lease 3 characters",
    })
    .max(6, "hex color sould be less than 6 characters")
    .refine(
      (value) => /^[a-zA-Z0-9]*$/.test(value ?? ""),
      "hex color only contains character or number"
    ),
});
