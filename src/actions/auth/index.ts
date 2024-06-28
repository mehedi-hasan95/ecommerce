"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

// Function to update Clerk role
const updateClerkRole = async (clerkId: string, role: string) => {
  try {
    // Assume Clerk has a method to update user roles, this is just an example
    await clerkClient.users.updateUser(clerkId, { publicMetadata: { role } });
    return true;
  } catch (error) {
    console.error("Failed to update Clerk role:", error);
    return false;
  }
};
export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  role: string,
  email: string
) => {
  try {
    const registered = await db.user.create({
      data: {
        fullname,
        clerkId,
        role,
        email,
      },
      select: {
        fullname: true,
        id: true,
        role: true,
        email: true,
      },
    });

    if (registered) {
      const clerkUpdateSuccess = await updateClerkRole(clerkId, role);
      // return { status: 200, user: registered };
      if (clerkUpdateSuccess) {
        return { status: 200, user: registered };
      } else {
        return {
          status: 500,
          message: "User registered, but failed to update Clerk role",
        };
      }
    }
  } catch (error) {
    return { status: 400 };
  }
};

export const onLoginUser = async () => {
  const user = await currentUser();
  if (!user) auth().redirectToSignIn();
  else {
    try {
      const authenticated = await db.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          fullname: true,
          id: true,
          role: true,
        },
      });
      if (authenticated) {
        return { status: 200, user: authenticated };
      }
    } catch (error) {
      return { status: 400 };
    }
  }
};
