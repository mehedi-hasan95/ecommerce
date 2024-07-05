import { userRole } from "@/lib/roles";
import { redirect } from "next/navigation";

const SellerLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await userRole();
  if (user === "user") redirect("/");
  return <div className="">{children}</div>;
};

export default SellerLayout;
