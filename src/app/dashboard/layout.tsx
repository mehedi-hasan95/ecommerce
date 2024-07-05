import { userRole } from "@/lib/roles";
import { DashboardMenu } from "./_components/dashboard-menu";
import menus from "../dashboard/(admin)/_components/admin-menu-list.json";
import sellerMenus from "../dashboard/(seller)/_components/seller-menu-list.json";
import { AdminMenuItem } from "./(admin)/_components/admin-menu-item";

const AdminDashboard = async ({ children }: { children: React.ReactNode }) => {
  const user = await userRole();
  return (
    <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-5 gap-5">
      <div className="col-span-1 h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <DashboardMenu />
        {/* For admin  */}
        {user === "ADMIN" && (
          <>
            {menus.map((menu) => (
              <AdminMenuItem key={menu.id} href={menu.url} label={menu.name} />
            ))}
          </>
        )}
        {/* For Seller  */}
        {user !== "user" && (
          <>
            {sellerMenus.map((menu) => (
              <AdminMenuItem key={menu.id} href={menu.url} label={menu.name} />
            ))}
          </>
        )}
      </div>
      <div className="col-span-4">{children}</div>
    </div>
  );
};

export default AdminDashboard;
