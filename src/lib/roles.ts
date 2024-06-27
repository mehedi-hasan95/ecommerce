import { auth } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const userRole = async () => {
  const { userId } = auth();
  const data = await db.user.findUnique({
    where: {
      clerkId: userId as string,
    },
    select: {
      role: true,
    },
  });
  return data?.role;
};
