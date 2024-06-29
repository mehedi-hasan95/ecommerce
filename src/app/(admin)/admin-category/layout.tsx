import { userRole } from "@/lib/roles";
import { redirect } from "next/navigation";

const CategoryLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await userRole();
  if (currentUser !== "ADMIN") redirect("/");
  return <div className="max-w-screen-2xl mx-auto px-6">{children}</div>;
};

export default CategoryLayout;
