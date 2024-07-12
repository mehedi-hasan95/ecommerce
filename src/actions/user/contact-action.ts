"use server";

import { db } from "@/lib/prisma";
import { ContactSchema } from "@/schemas/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createContactAction = async (
  values: z.infer<typeof ContactSchema>
) => {
  try {
    await db.contact.create({
      data: {
        ...values,
      },
    });
    revalidatePath("/");
    return { success: "Message set successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
