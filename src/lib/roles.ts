import { auth } from "@clerk/nextjs/server";
import { db } from "./prisma";
import { redirect } from "next/navigation";

export const userRole = async () => {
  const { userId } = auth();
  if (!userId) redirect("/auth/sign-in");
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

export const loginUser = async () => {
  const { userId } = auth();
  if (!userId) redirect("/auth/sign-in");
  const data = await db.user.findUnique({
    where: {
      clerkId: userId as string,
    },
  });
  return data?.clerkId;
};
