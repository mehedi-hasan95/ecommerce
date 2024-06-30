import { userRole } from "@/lib/roles";
import { redirect } from "next/navigation";
import { AdminMenus } from "./_components/admin-menus";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await userRole();
  if (currentUser !== "ADMIN") redirect("/");
  return (
    <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-5 gap-5">
      <div className="col-span-1">
        <AdminMenus />
      </div>
      <div className="col-span-4">{children}</div>
    </div>
  );
};

export default AdminLayout;
