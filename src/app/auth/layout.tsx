import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  if (user) redirect("/");
  return (
    <div className="max-w-screen-md mx-auto px-6 items-center justify-center flex flex-col h-screen w-full">
      {children}
    </div>
  );
};

export default AuthLayout;
