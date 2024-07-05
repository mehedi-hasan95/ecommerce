import { userRole } from "@/lib/roles";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await userRole();
  if (user !== "ADMIN") redirect("/");
  return <div className="">{children}</div>;
};

export default AdminLayout;
