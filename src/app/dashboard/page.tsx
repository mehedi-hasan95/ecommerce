import { userRole } from "@/lib/roles";
import { SellerDashboard } from "./_components/(seller)/seller-dashboard";

const page = async () => {
  const role = await userRole();
  return (
    <div>
      {role === "ADMIN" && <div>Admin Dashboard</div>}
      {role === "seller" && <SellerDashboard />}
      {role === "user" && <div>User Dashboard</div>}
    </div>
  );
};

export default page;
