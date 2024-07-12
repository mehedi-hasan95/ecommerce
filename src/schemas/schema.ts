import { Offer } from "@prisma/client";
import * as z from "zod";

export const CategorySchema = z.object({
  name: z.string().min(2, {
    message: "Category name is required",
  }),
  img: z
    .string({ message: "Image is reqired" })
    .min(1, { message: "Add an Image" }),
  color: z
    .string()
    .min(4, {
      message: "hex color sould be at lease 4 characters",
    })
    .max(7, "hex color sould be less than 7 characters")
    .regex(/^#/, { message: "String must be a valid hex code" })
    .refine(
      (value) => /^[a-zA-Z0-9#]*$/.test(value ?? ""),
      "hex color only contains character or number"
    )
    .optional(),
});

export const BrandSchema = z.object({
  name: z.string().min(2, {
    message: "Brand name is required",
  }),
  img: z
    .string({ message: "Image is reqired" })
    .min(1, { message: "Add an Image" }),
});

export const ProductsSchema = z.object({
  title: z.string().min(2, { message: "Product name is required" }),
  desc: z.string().min(2, { message: "Description is required" }),
  basePrice: z.coerce.number({ message: "Base price is optional" }).optional(),
  price: z.coerce.number({ message: "Price is required" }),
  quantity: z.coerce.number({ message: "Quantity is required" }),
  offer: z.enum([Offer.BUY_ONE_GET_ONE, Offer.SPECIAL_OFFERS]).optional(),
  categoryId: z.string({ message: "Please select a category" }),
  brandId: z.string({ message: "Please select a Brand" }),
  image: z.object({ url: z.string() }).array(),
});

export const AddToCartSchema = z.object({
  productId: z.string().min(2, {
    message: "productId Name is required",
  }),
  quantity: z.coerce.number().min(1, {
    message: "Product quantity is required",
  }),
  offer: z.enum([Offer.BUY_ONE_GET_ONE, Offer.SPECIAL_OFFERS]).optional(),
});

export const WriteBlogSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Blog title is required",
    })
    .max(200, {
      message: "Title should be at most 50 words or 200 characters",
    }),
  short_desc: z
    .string()
    .min(2, {
      message: "Short description title is required",
    })
    .max(400, {
      message: "Description should be at most 100 words or 400 characters",
    }),
  desc: z.string().min(2, {
    message: "Description should at least 2 words",
  }),
  tags: z.array(z.string()).min(2, { message: "Please add some tags" }),
  image: z.string({ message: "Image is required" }),
});

export const ContactSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .max(20, { message: "Name length is maximum 5 words or 20 characters" }),
  email: z
    .string({ message: "Email is required" })
    .max(40, { message: "Email length is maximum 10 words or 40 characters" }),
  message: z
    .string({ message: "Message is required" })
    .max(200, {
      message: "Message length is maximum 50 words or 200 characters",
    }),
});
